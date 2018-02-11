const FIAT_VALUES = {
  dollar: '$',
  euro: '€',
  pound: '£'
};

export const calculateTradingValue = ( amount, price ) => amount * price;
export const fiatConverter = fiat => FIAT_VALUES[ fiat ];
