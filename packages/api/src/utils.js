const { Crypto } = require( './model' );

export const getTradesFromDb = async () => Crypto.find({});

export const getDataFromTrades = ( trades ) => {
  let fsyms = [];
  let tsyms = [];
  let allTrades = [];
  const pairs = {};
  let tempPairs = [];

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

export const findOccurrencesFor = (
  type,
  { pairs, allTrades },
  { selectedCrypto, selectedPair }
) => {
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
