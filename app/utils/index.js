const FIAT_SIGN = {
  dollar: '$',
  euro: '€',
  pound: '£'
};

const FIAT_THREE_CODE_LETTER = {
  dollar: 'USD',
  euro: 'EUR',
  pound: 'GBP'
};

export const calculateTradingValue = ( amount, price ) => amount * price;
export const getFiatSign = fiat => FIAT_SIGN[ fiat ];
export const getFiatCodeLetter = fiat => FIAT_THREE_CODE_LETTER[ fiat ];
