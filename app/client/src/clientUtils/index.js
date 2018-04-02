import {
  FIAT_SIGN, FIAT_THREE_CODE_LETTER, API_URL
} from '../config/client';

export const calculateTradingValue = ( amount, price ) => ( amount * price ).toFixed( 5 );

export const getFiatSign = fiat => FIAT_SIGN[ fiat ];

export const getFiatCodeLetter = fiat => FIAT_THREE_CODE_LETTER[ fiat ];

export const getAPIUrl = query => `${API_URL}${query}`;

export const calculateProfitLost = ( invested, currentValue ) =>
  ( currentValue - invested ).toFixed( 5 );

export const isTradeProfitable = tradeValue => tradeValue >= 0;

export const getValueWithFiatSign = ( fiat, value ) => `${FIAT_SIGN[ fiat ]}${value}`;

export const getInputFieldValues = ( inputs ) => {
  const data = {};
  const inputValues = inputs.map( input => ( input.checked || input.name !== 'fiatCrypto' ? input : null ));

  inputValues.forEach(( item ) => {
    if ( item ) {
      data[ item.name ] = item.value;
      item.value = '';
      item.checked = false;
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

export const newStateSuccess = ( data, status ) => ({ data, status });
export const newStateFailure = ( state, message, status ) => ({ ...state, message, status });
