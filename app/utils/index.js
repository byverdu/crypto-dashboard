import {
  FIAT_SIGN, FIAT_THREE_CODE_LETTER, API_URL
} from '../config/client';

export const calculateTradingValue = ( amount, price ) => amount * price;
export const getFiatSign = fiat => FIAT_SIGN[ fiat ];
export const getFiatCodeLetter = fiat => FIAT_THREE_CODE_LETTER[ fiat ];
export const getAPIUrl = query => `${API_URL}${query}`;
