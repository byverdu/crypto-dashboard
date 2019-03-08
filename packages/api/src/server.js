import express from 'express';
import bodyParser from 'body-parser';
import * as ctrl from './controllers';
import {
  getTradesFromDb, getDataFromTrades, findOccurrencesFor
} from './utils';

const socketIO = require( 'socket.io' );
const http = require( 'http' );
const em = require( './eventEmitter' );
const logger = require( './logger' );

const app = express();
// our server instance
const server = http.createServer( app );
const io = socketIO( server );

io.on( 'connection', ( socket ) => {
  logger.info( 'io-socket emitting from port 9000' );
  let apiParams;

  ( async () => {
    try {
      const trades = await getTradesFromDb();
      apiParams = getDataFromTrades( trades );

      socket.emit( 'initialPayload', apiParams );
    } catch ( error ) {
      throw ( error );
    }
  })();

  em.on( 'itemSavedToDb', ( data ) => {
    const { selectedCrypto, selectedPair } = data.exchangeData;
    const missingCrypto = apiParams.fsyms.indexOf( selectedCrypto ) === -1;
    const missingPair = apiParams.tsyms.indexOf( selectedPair ) === -1;

    // keeping track for how many trades we've, no matter if they're same pair
    apiParams.allTrades.push( `${selectedCrypto}~${selectedPair}` );

    if ( missingCrypto || missingPair ) {
      logger.info( 'eventEmitter sending ...' );
      const toAppend = ( prop, value ) => ( prop.length === 0 ?
        `${value}` :
        `,${value}` );

      if ( missingCrypto ) {
        apiParams.fsyms += toAppend( apiParams.fsyms, selectedCrypto );
      }
      if ( missingPair ) {
        apiParams.tsyms += toAppend( apiParams.tsyms, selectedPair );
      }

      if ( apiParams.pairs[ selectedCrypto ] === undefined && apiParams.pairs[ selectedCrypto ] !== selectedPair ) {
        apiParams.pairs = {
          ...apiParams.pairs,
          [ selectedCrypto ]: selectedPair
        };
      }
    }
    socket.emit( 'updateApiParams', apiParams );
  });

  em.on( 'itemRemovedFromDb', ( data ) => {
    const { selectedCrypto, selectedPair } = data.exchangeData;

    if ( findOccurrencesFor( 'trades', apiParams, data.exchangeData ) === 1 ) {
      if ( findOccurrencesFor( 'crypto', apiParams, data.exchangeData ) === 1 ) {
        apiParams.fsyms = apiParams.fsyms.split( ',' ).filter( item => item !== selectedCrypto ).join( ',' );
      }

      if ( findOccurrencesFor( 'pair', apiParams, data.exchangeData ) === 1 ) {
        apiParams.tsyms = apiParams.tsyms.split( ',' ).filter( item => item !== selectedPair ).join( ',' );
      }

      if ( apiParams.pairs[ selectedCrypto ] === selectedPair ) {
        delete apiParams.pairs[ selectedCrypto ];
      }
    }


    socket.emit( 'updateApiParams', apiParams );
  });
});

// Parse requests as JSON
app.use( bodyParser.json());

app.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS' );
  res.header( 'Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With' );
  res.sendStatus( 200 );
});

app.get( '/api/portfolio', ctrl.get );
app.post( '/api/add-entry', ctrl.post );
app.delete( '/api/delete-entry/:uuid', ctrl.remove );
app.put( '/api/edit-entry/:uuid', ctrl.update );
app.put( '/api/edit-trade/:uuid', ctrl.updateTrade );

module.exports = server;
