import { CRYPTOFILE_PATH } from '../config';

const socketIO = require( 'socket.io' );
const fs = require( 'fs' );
const { promisify } = require( 'util' );

const readFileAsync = promisify( fs.readFile );

console.log( 'file loaded' );

const readCryptoFile = async ( apiParams ) => {
  try {
    const portfolio = await readFileAsync( CRYPTOFILE_PATH, { encoding: 'utf8' });
    const parsedData = JSON.parse( portfolio );
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

    console.log( fsyms, tsyms, 'websocket' );
  } catch ( err ) {
    throw new Error( `Read JSON error: ${err}` );
  }
};

module.exports = function ( server ) {
  const io = socketIO( server );
  const apiParams = {};
  readCryptoFile( apiParams );

  io.on( 'connection', ( socket ) => {
    fs.watch( CRYPTOFILE_PATH, { encoding: 'UTF-8' }, ( eventType, filename ) => {
      if ( filename ) {
        console.log( filename, eventType );
        readCryptoFile( apiParams );
      }
    });
    socket.emit( 'clientEvent', apiParams );
    console.log( 'message sent to the clients' );
  });
};

