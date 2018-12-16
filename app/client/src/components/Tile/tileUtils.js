import {
  calculateTradingValue,
  getValueWithFiatSign,
  calculateProfitLost,
  isTradeProfitable
} from '../../clientUtils';

export const getTileHeaderProps = ( props, onClickRemoveItem, onClickEditItem, isOpen ) => ({
  name: props.exchangeData.selectedCrypto,
  onClickRemoveItem,
  onClickEditItem,
  isOpen
});

export const getTileBodyProps = ( props ) => {
  const {
    dateCrypto: date,
    coinCrypto: name,
    priceCrypto: price,
    amountCrypto: amount,
    fiatCrypto: fiat,
    exchangeCrypto: exchange
  } = props;
  const tradeValue = calculateTradingValue( amount, price );

  return {
    date,
    amount,
    name,
    price: getValueWithFiatSign( fiat, price ),
    tradeValue: getValueWithFiatSign( fiat, tradeValue ),
    exchange
  };
};

export const getTileFooterProps = ( props, state ) => {
  const {
    priceCrypto: price,
    amountCrypto: amount,
    fiatCrypto: fiat
  } = props;
  const { actualPrice } = state;
  const tradeValue = calculateTradingValue( amount, price );
  const actualValue = calculateTradingValue( amount, actualPrice );
  const profitLost = calculateProfitLost( tradeValue, actualValue );
  const isProfit = isTradeProfitable( profitLost );

  return {
    actualPrice: getValueWithFiatSign( fiat, actualPrice ),
    amount,
    profitLost,
    isProfit,
    actualValue
  };
};
