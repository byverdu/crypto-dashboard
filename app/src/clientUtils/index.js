import {
  FIAT_SIGN, FIAT_THREE_CODE_LETTER, API_URL
} from '../../config/client';

export const calculateTradingValue = ( amount, price ) => ( amount * price ).toFixed( 3 );

export const getFiatSign = fiat => FIAT_SIGN[ fiat ];

export const getFiatCodeLetter = fiat => FIAT_THREE_CODE_LETTER[ fiat ];

export const getAPIUrl = query => `${API_URL}${query}`;

export const calculateProfitLost = ( invested, currentValue ) =>
  ( currentValue - invested ).toFixed( 3 );

export const isTradeProfitable = tradeValue => tradeValue >= 0;

export const getValueWithFiatSign = ( fiat, value ) => `${FIAT_SIGN[ fiat ]} ${value}`;