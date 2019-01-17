import { createAction } from 'redux-actions';
import {
  FIAT_NAME_CHANGED,
  DATE_CRYPTO_CHANGED,
  EXCHANGEDATA_CHANGED,
  PRICE_OR_AMOUNT_TRADE_CHANGED,
  CLEAR_FORM_VALUES,
  FORM_SUBMITTED
} from '../constants';

const fiatNameChanged = createAction( FIAT_NAME_CHANGED );
const dateCryptoChanged = createAction( DATE_CRYPTO_CHANGED );
const exchangedDataChanged = createAction( EXCHANGEDATA_CHANGED );
const priceOrAmountTradeChanged = createAction( PRICE_OR_AMOUNT_TRADE_CHANGED );
const clearFormValues = createAction( CLEAR_FORM_VALUES );
const formSubmitted = createAction( FORM_SUBMITTED );

export {
  fiatNameChanged,
  dateCryptoChanged,
  exchangedDataChanged,
  priceOrAmountTradeChanged,
  clearFormValues,
  formSubmitted
};
