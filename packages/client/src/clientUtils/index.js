import moment from 'moment';
import * as config from '../config/client';

export const calculateTradingValue = ( amount, price ) => ( amount * price ).toFixed( 5 );

export const getFiatSign = fiat => config.FIAT_SIGN[ fiat ];

export const getFiatCodeLetter = fiat => config.FIAT_THREE_CODE_LETTER[ fiat ];

export const getAPIUrl = query => `${config.CRYPTO_API_URL}${query}`;

export const getSocketUrl = () => config.WEBSOCKET_URL;

export const calculateProfitLost = ( invested, currentValue ) =>
  ( currentValue - invested ).toFixed( 5 );

export const isTradeProfitable = tradeValue => tradeValue >= 0;

export const getValueWithFiatSign = ( fiat, value ) => `${config.FIAT_SIGN[ fiat ]}${value}`;

export const getInputFieldValues = ( inputs ) => {
  const data = {};
  const inputValues = inputs.map( input => ( input.checked || input.name !== 'fiatCrypto' ? input : null ));

  inputValues.forEach(( item ) => {
    if ( item && item.name !== '' ) {
      data[ item.name ] = item.value;
    }
  });

  return data;
};

export const fetchConfig = ( method, data ) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( data )
});

export const hasRequiredField = configObj => Object.keys( configObj ).find( key => key === 'required' ) !== undefined;

export const newState = (
  state, propName, data, status
) => ({ ...state, [ propName ]: data, status });

export const newStateFailed = (
  state, message, status
) => ({ ...state, message, status });

export const newStateSuccess = (
  state, data, status, text
) => {
  const message = data.length === 0 ?
    'No data saved in portfolio' :
    text;

  return {
    ...state, data, status, message
  };
};

export const applyValuesToInput = ( formData, props ) => {
  const newValue = item => ( item.name !== 'fiatCrypto' ? props[ item.name ] : item.value );

  const newData = formData
    .slice( 0 )
    .map( item => ({
      ...item,
      value: newValue( item ),
      id: `${item.id}-${props.position}`
    }));

  const indexItem = newData.findIndex( item => item.value === props.fiatCrypto );

  if ( indexItem >= 0 ) {
    newData[ indexItem ] = { ...newData[ indexItem ], checked: true };
  }

  return newData;
};

export const getAPIUrlPriceHistorical = ({
  exchangeData: { selectedCrypto, selectedPair }, dateCrypto
}) => {
  const timestamp = ( Date.parse( dateCrypto ) / 1000 );

  return getAPIUrl(
    `pricehistorical?fsym=${selectedCrypto}&tsyms=${selectedPair}&ts=${timestamp}`
  );
};

export const getAPIUrlPriceMulti = ({ coins, fiats }) => getAPIUrl(
  `pricemulti?fsyms=${coins.join( ',' )}&tsyms=${fiats.join( ',' )}`
);

export const getFiatToWatch = ( fiatToWatch, trades ) => {
  const filteredTrade = propToFilter => trades.map( trade => ( trade.fiatName !== 'NA' ? trade[ propToFilter ] : null ));
  const { coins, fiats } = fiatToWatch;

  const pairTrades = coins.concat( filteredTrade( 'pairCrypto' ));
  const coinTrades = pairTrades.concat( trades.map( trade => trade.exchangeData.selectedCrypto ));
  const fiatTrades = fiats.concat( filteredTrade( 'fiatName' ));

  fiatToWatch.coins = [...new Set( coinTrades )].filter( notNull => notNull );
  fiatToWatch.fiats = [...new Set( fiatTrades )].filter( notNull => notNull );
};

export const socketSubscriptionGenerator = ({ selectedExchange, selectedCrypto, selectedPair }) => `2~${selectedExchange}~${selectedCrypto}~${selectedPair}`;

export const getCryptoPairToWatch = ({ selectedCrypto, selectedPair }) => `${selectedCrypto}~${selectedPair}`;

// export const getCryptoPairToWatch = trade => trade.slice( 2 );

export const deleteRepeatedItems = items => [...new Set( items )];

const findMissingItem = ( bigArray, smallArray ) => bigArray
  .map( item => ( smallArray.indexOf( item ) === -1 ? item : null ))
  .filter( notNull => notNull );

export const generateSubscription = ( oldProps, newProps ) => {
  const tempOldProps = deleteRepeatedItems( oldProps );
  const tempNewProps = deleteRepeatedItems( newProps );

  return findMissingItem( tempNewProps, tempOldProps );
};

export const generateUnsubscribe = ( oldProps, newProps ) => findMissingItem( oldProps, newProps );

export const getSocketResponseFlag = flag => config.SOCKET_RESPONSE_FLAG[ flag ];

export const getSocketData = ( socketData ) => {
  const keys = [
    'exchange', 'coin', 'pair', 'flag', 'price'
  ];
  const data = socketData.split( '~' ).slice( 1, 6 );
  const tempObj = {
    pairToWatch: data.slice( 0, 3 ).join( '~' )
  };

  data.forEach(( item, index ) => {
    tempObj[ keys[ index ] ] = item;
    return tempObj;
  });

  return tempObj;
};

export const mergeReducers = ( ...reducers ) =>
  ( state, action ) =>
    reducers.reduce(( acc, func ) => (
      { ...acc, ...func( acc, action ) }
    ), state );

export const formattedDate = (date, format) => moment( date ).format( format );

export const getTotalInvested = ( portFolioData ) => {
  if ( portFolioData ) {
    return portFolioData.reduce(( prev, curr ) => prev += ( Number( curr.amountInvested )), 0 );
  }
};

export const toLocaleString = (amount, count = 2) => (amount).toLocaleString(undefined, {maximumFractionDigits: count});

export const getCryptoPriceForFiat = (trades, compareApiData) => {
  let price;
  trades.forEach(element => {
    const fiatPrice = compareApiData.find( elem => {
      if (elem.pairToWatch === `${element.exchangeData.selectedPair}~${element.fiatName}`) {
        return elem;
      }
    }).PRICE;
    const tradePrice = compareApiData.find( elem => elem.pairToWatch === element.pairToWatch).PRICE;

    price = (tradePrice * fiatPrice);
  });

  return price;
}

export const test = (trade, compareApiData) => {
  const x = compareApiData.find( elem => {
    if (elem.pairToWatch === `${trade.exchangeData.selectedPair}~${trade.fiatName}`) {
      return elem;
    }
  });

  if (x) {
    const price = x.PRICE;

    const tradePrice = compareApiData.find( elem => elem.pairToWatch === trade.pairToWatch).PRICE;
  
    return(price * tradePrice)
  }
  
}