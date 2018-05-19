import * as config from '../config/client';

export const calculateTradingValue = ( amount, price ) => ( amount * price ).toFixed( 8 );

export const getFiatSign = fiat => config.FIAT_SIGN[ fiat ];

export const getFiatCodeLetter = fiat => config.FIAT_THREE_CODE_LETTER[ fiat ];

export const getAPIUrl = query => `${config.CRYPTO_API_URL}${query}`;

export const getSocketUrl = () => config.WEBSOCKET_URL;

export const calculateProfitLost = ( invested, currentValue ) =>
  ( currentValue - invested ).toFixed( 8 );

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

export const getCryptocompareUrl = ({
  coinCrypto, pairCrypto, dateCrypto
}) => {
  const timestamp = ( Date.parse( dateCrypto ) / 1000 );

  return getAPIUrl(
    `pricehistorical?fsym=${coinCrypto}&tsyms=${pairCrypto}&ts=${timestamp}`
  );
};

export const socketSubscriptionGenerator = ({ exchangeCrypto, coinCrypto, pairCrypto }) => `2~${exchangeCrypto}~${coinCrypto}~${pairCrypto}`;

export const getCryptoPairToWatch = trade => trade.slice( 2 );

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

export const getSocketData = socketData => socketData.split( '~' ).slice( 1, 6 );

export const getSocketResponseFlag = flag => config.SOCKET_RESPONSE_FLAG[ flag ];
