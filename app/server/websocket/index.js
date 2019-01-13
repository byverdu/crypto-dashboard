import { CRYPTOFILE_PATH } from '../../config/server';

const socketIO = require( 'socket.io' );
const fs = require( 'fs' );
const { promisify } = require( 'util' );

module.exports = function ( server ) {
  const readFileAsync = promisify( fs.readFile );
  const apiParams = {
    fsyms: '',
    tsyms: ''
  };
  const io = socketIO( server );
  io.on( 'connection', ( socket ) => {
    fs.watch( CRYPTOFILE_PATH, { encoding: 'UTF-8' }, ( eventType, filename ) => {
      if ( filename ) {
        console.log( filename, eventType );
        readFileAsync(
          CRYPTOFILE_PATH,
          { encoding: 'utf8' }
        ).then(( resp ) => {
          const parsedData = JSON.parse( resp );
          let fsyms = [];
          let tsyms = [];

          parsedData.forEach(( item ) => {
            fsyms.push( item.exchangeData.selectedCrypto );
            tsyms.push( item.exchangeData.selectedPair );
          });

          fsyms = [...new Set( fsyms )];
          tsyms = [...new Set( tsyms )];

          apiParams.fsyms = fsyms.join( ',' );
          apiParams.tsyms = tsyms.join( ',' );

          console.log( apiParams );
        }).catch(( err ) => {
          throw new Error( `Read JSON error: ${err}` );
        });
      }
    });
    socket.emit( 'clientEvent', apiParams );
    console.log( 'message sent to the clients' );
  });
};

