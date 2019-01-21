import express from 'express';
import bodyParser from 'body-parser';
import * as ctrl from './controllers';

const socketIO = require( 'socket.io' );
const http = require( 'http' );
const em = require( './eventEmitter' );
const logger = require( './logger' );
const { Crypto } = require( './model' );

const app = express();
// our server instance
const server = http.createServer( app );
const io = socketIO( server );

const getTradesFromDb = async () => Crypto.find({});

const getDataFromExchange = ( trades ) => {
  let fsyms = [];
  let tsyms = [];
  let tempPairs = [];
  const pairs = {};

  trades.forEach(( item ) => {
    const { selectedCrypto, selectedPair } = item.exchangeData;
    fsyms.push( selectedCrypto );
    tsyms.push( selectedPair );
    tempPairs.push( `${selectedCrypto}~${selectedPair}` );
  });

  fsyms = [...new Set( fsyms )];
  tsyms = [...new Set( tsyms )];
  tempPairs = [...new Set( tempPairs )];

  tempPairs.forEach(( pair ) => {
    const items = pair.split( '~' );

    pairs[ items[ 0 ] ] = items[ 1 ];
  });

  return {
    fsyms: fsyms.join( ',' ),
    tsyms: tsyms.join( ',' ),
    pairs
  };
};


io.on( 'connection', ( socket ) => {
  logger.info( 'io-socket emitting from port 9000' );
  let apiParams;

  ( async () => {
    try {
      const trades = await getTradesFromDb();
      apiParams = getDataFromExchange( trades );

      socket.emit( 'initialPayload', apiParams );
    } catch ( error ) {
      throw ( error );
    }
  })();

  em.on( 'dataChanged', ( data ) => {
    const { selectedCrypto, selectedPair } = data.exchangeData;
    const missingCrypto = apiParams.fsyms.indexOf( selectedCrypto ) === -1;
    const missingPair = apiParams.tsyms.indexOf( selectedPair ) === -1;

    if ( missingCrypto || missingPair ) {
      logger.info( 'eventEmitter sending ...' );

      if ( missingCrypto ) {
        apiParams.fsyms += `,${selectedCrypto}`;
      } else if ( missingPair ) {
        apiParams.tsyms += `,${selectedPair}`;
      }

      socket.emit( 'updateApiParams', apiParams );
    }
  });
});

// Parse requests as JSON
app.use( bodyParser.json());

app.get( '/api/portfolio', ctrl.get );
app.post( '/api/add-entry', ctrl.post );
app.delete( '/api/delete-entry/:uuid', ctrl.remove );
// app.put( '/api/edit-entry/:uuid', ctrl.putAPI );

module.exports = server;
