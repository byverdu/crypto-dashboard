const http = require( 'http' );
const io = require( 'socket.io-client' );
const cron = require( 'node-cron' );
const axios = require( 'axios' );

const { NODE_ENV = 'development', PORT = 5000, CRYPTO_API_KEY } = process.env;
const socketHost = NODE_ENV === 'development' ? 'http://localhost:9000' : 'ws://crypto_api:9000';

const extractDataFromResponse = ( apiParams, data ) => {
  const temp = Object.keys( apiParams );
  const tempData = data.RAW;
  const dataForUi = [];

  temp.forEach(( item ) => {
    const {
      FLAGS, HIGH24HOUR, HIGHDAY, PRICE, HIGHHOUR
    } = tempData[ item ][ apiParams[ item ] ];

    dataForUi.push({
      FLAGS,
      HIGH24HOUR,
      HIGHDAY,
      HIGHHOUR,
      PRICE,
      pairToWatch: `${item}~${[apiParams[ item ]]}`
    });
  });

  return dataForUi;
};

const getUrl = apiParams => `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${apiParams.fsyms}&tsyms=${apiParams.tsyms}&api_key=${CRYPTO_API_KEY}`;
const socket = io.connect( socketHost, {
  reconnection: true
});
let apiParams = {};

socket.on( 'connect', () => {
  console.log( 'connected to localhost:9000' );

  socket.on( 'initialPayload', ( data ) => {
    console.log( 'initialPayload message received from the server', data );
    apiParams = data;
  });
  socket.on( 'updateApiParams', ( data ) => {
    console.log( 'updateApiParams message received from the server:', data );
    apiParams = data;
  });
});

const callCompareApi = async params => axios.get( `${getUrl( params )}` );

http
  .createServer( async ( request, response ) => {
    console.log( `Requested url: ${request.url}` );

    if ( request.url.toLowerCase() === '/events' ) {
      response.writeHead( 200, {
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });

      // sending a response immediately the user loads the page.
      if ( apiParams.tsyms && ( apiParams.tsyms !== '' && apiParams.fsyms !== '' )) {
        try {
          const apiData = await callCompareApi( apiParams );
          const data = extractDataFromResponse( apiParams.pairs, apiData.data );
          response.write( `data: ${JSON.stringify( data )}` );
          response.write( '\n\n' );
        } catch ( error ) {
          throw new Error( `Read JSON error: ${error}` );
        }
      }

      // @ts-ignore
      cron.schedule( '*/30 * * * * *', async () => {
        console.log( 'running a task every 30secs', apiParams );

        if ( apiParams.tsyms && ( apiParams.tsyms !== '' && apiParams.fsyms !== '' )) {
          try {
            const apiData = await callCompareApi( apiParams );
            const data = extractDataFromResponse( apiParams.pairs, apiData.data );
            console.log( apiData.data, 'cron job' );
            response.write( `data: ${JSON.stringify( data )}` );
            response.write( '\n\n' );
          } catch ( error ) {
            throw new Error( `Read JSON error: ${error}` );
          }
        }
      });
    } else {
      response.writeHead( 404 );
      response.end();
    }
  })
  .listen( PORT, () => {
    console.log( 'Server running at http://127.0.0.1:5000/' );
  });
