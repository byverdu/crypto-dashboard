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
  let allTrades = [];
  const pairs = {};

  trades.forEach(( item ) => {
    const { selectedCrypto, selectedPair } = item.exchangeData;
    fsyms.push( selectedCrypto );
    tsyms.push( selectedPair );
    tempPairs.push( `${selectedCrypto}~${selectedPair}` );
  });

  allTrades = [...tempPairs];
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
    pairs,
    allTrades
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
    const { pairs, allTrades } = apiParams;
    const findOccurrences = ( type ) => {
      let count = 0;
      const keysPairs = Object.keys( pairs );

      switch ( type ) {
        case 'crypto':
          keysPairs.forEach(( crypto ) => {
            if ( crypto === selectedCrypto ) {
              count += 1;
            }
          });
          break;

        case 'pair':
          keysPairs.forEach(( crypto ) => {
            if ( pairs[ crypto ] === selectedPair ) {
              count += 1;
            }
          });
          break;

        case 'trades':
          {
            const pairToCheck = `${selectedCrypto}~${selectedPair}`;
            allTrades.forEach(( crypto ) => {
              if ( crypto === pairToCheck ) {
                count += 1;
              }
            });
            const tradeIndex = allTrades.findIndex( trade => trade === pairToCheck );
            if ( tradeIndex !== -1 ) {
              allTrades.splice( tradeIndex, 1 );
            }
          }
          break;
        default:
          break;
      }

      return count;
    };

    if ( findOccurrences( 'trades' ) === 1 ) {
      if ( findOccurrences( 'crypto' ) === 1 ) {
        apiParams.fsyms = apiParams.fsyms.split( ',' ).filter( item => item !== selectedCrypto ).join( ',' );
      }

      if ( findOccurrences( 'pair' ) === 1 ) {
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
// app.put( '/api/edit-entry/:uuid', ctrl.putAPI );

module.exports = server;
