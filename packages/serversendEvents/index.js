const http = require( 'http' );
const io = require( 'socket.io-client' );
const cron = require( 'node-cron' );
const axios = require( 'axios' );

const socket = io.connect( 'http://localhost:9000/', {
  reconnection: true
});
let apiParams = {};

socket.on( 'connect', () => {
  console.log( 'connected to localhost:9000' );

  socket.on( 'initialPayload', ( data ) => {
    console.log( 'initialPayload message received from the server:', data );
    apiParams = data;
  });
  socket.on( 'updateApiParams', ( data ) => {
    console.log( 'message from the server:', data );
    // socket.emit( 'serverEvent', `thanks server! for sending '${data}'` );
    apiParams = data;
  });
});

http
  .createServer(( request, response ) => {
    console.log( `Requested url: ${request.url}` );

    if ( request.url.toLowerCase() === '/events' ) {
      response.writeHead( 200, {
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });

      // @ts-ignore
      cron.schedule( '*/20 * * * * *', () => {
        console.log( 'running a task every minute' );
        axios.get( `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${apiParams.fsyms}&tsyms=${apiParams.tsyms}&api_key=${process.env.CRYPTO_API_KEY}` )
          .then(( resp ) => {
            console.log( apiParams, 'cron job' );
            response.write( `data: ${JSON.stringify( resp.data )}` );
            // response.write( `data: ${JSON.stringify( apiParams )}` );
            response.write( '\n\n' );
          })
          .catch(( err ) => {
            throw new Error( `Read JSON error: ${err}` );
          });
      });
    } else {
      response.writeHead( 404 );
      response.end();
    }
  })
  .listen( 5000, () => {
    console.log( 'Server running at http://127.0.0.1:5000/' );
  });
