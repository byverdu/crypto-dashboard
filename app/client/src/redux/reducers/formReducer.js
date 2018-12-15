import { handleActions } from 'redux-actions';
import {
  FETCH_EXCHANGES_SUCCESS,
  FETCH_EXCHANGES_FAILED,
  FIAT_NAME_CHANGED,
  DATE_CRYPTO_CHANGED,
  EXCHANGEDATA_CHANGED,
  PRICE_OR_AMOUNT_TRADE_CHANGED
} from '../constants';

const inialState = {
  data: {},
  message: '',
  status: 0,
  formValues: {
    fiatName: '',
    dateCrypto: null,
    exchangeData: undefined,
    amountCrypto: 0,
    priceCrypto: 0
  }
};

const formReducer = handleActions({
  [ FETCH_EXCHANGES_SUCCESS ]: (
    state,
    { payload: { status, data } }
  ) => ({
    ...state,
    data,
    status
  }),
  [ FETCH_EXCHANGES_FAILED ]: (
    state,
    { payload: { status, message } }
  ) => ({
    ...state,
    message,
    status
  }),
  [ FIAT_NAME_CHANGED ]: (
    state,
    { payload }
  ) => ({
    ...state,
    formValues: {
      ...state.formValues,
      fiatName: payload
    }
  }),
  [ DATE_CRYPTO_CHANGED ]: (
    state,
    { payload }
  ) => ({
    ...state,
    formValues: {
      ...state.formValues,
      dateCrypto: payload
    }
  }),
  [ EXCHANGEDATA_CHANGED ]: (
    state,
    { payload }
  ) => ({
    ...state,
    formValues: {
      ...state.formValues,
      exchangeData: payload
    }
  }),
  [ PRICE_OR_AMOUNT_TRADE_CHANGED ]: (
    state,
    { payload }
  ) => ({
    ...state,
    formValues: {
      ...state.formValues,
      [ payload.name ]: payload.value
    }
  })
}, inialState );

export default formReducer;
