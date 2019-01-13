const http = require( 'http' );
const io = require( 'socket.io-client' );
const cron = require( 'node-cron' );
const axios = require( 'axios' );

const socket = io.connect( 'http://localhost:9000/', {
  reconnection: true
});
let apiParams = {
  fsyms: '',
  tsyms: ''
};

socket.on( 'connect', () => {
  console.log( 'connected to localhost:3000' );
  socket.on( 'clientEvent', ( data ) => {
    console.log( 'message from the server:', data );
    socket.emit( 'serverEvent', `thanks server! for sending '${data}'` );
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

      let data;

      // @ts-ignore
      cron.schedule( '*/20 * * * * *', () => {
        console.log( 'running a task every minute' );
        axios.get( `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${apiParams.fsyms}&tsyms=${apiParams.tsyms}&api_key=7e48716d809e374b61f4631b4b6bcedb2c76782d4f490a1e54c352f539c34ad1` )
          .then(( resp ) => {
            console.log( resp.data );
            // data = resp.data;
            response.write( `data: ${JSON.stringify( resp.data )}` );
            // console.log( data, 'server data' );
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
