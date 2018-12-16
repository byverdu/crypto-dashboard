import { createAction } from 'redux-actions';
import {
  FIAT_NAME_CHANGED,
  DATE_CRYPTO_CHANGED,
  EXCHANGEDATA_CHANGED,
  PRICE_OR_AMOUNT_TRADE_CHANGED,
  CLEAR_FORM_VALUES
} from '../constants';

const fiatNameChanged = createAction( FIAT_NAME_CHANGED );
const dateCryptoChanged = createAction( DATE_CRYPTO_CHANGED );
const exchangedDataChanged = createAction( EXCHANGEDATA_CHANGED );
const priceOrAmountTradeChanged = createAction( PRICE_OR_AMOUNT_TRADE_CHANGED );
const clearFormValues = createAction( CLEAR_FORM_VALUES );

export {
  fiatNameChanged,
  dateCryptoChanged,
  exchangedDataChanged,
  priceOrAmountTradeChanged,
  clearFormValues
};
