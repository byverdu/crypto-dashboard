import { handleActions } from 'redux-actions';
import {
  FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS,
  FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS,
  FETCH_CRYPTOCOMPARE_API_FAILED
} from '../constants';
import { newState, newStateFailed } from '../../clientUtils';

const initialApiState = {
  status: 0,
  priceMulti: {},
  priceHistorical: 0,
  message: ''
};

function getValueNestedObject( obj ) {
  const keys = Object.keys( obj ).pop();

  return Object.values( obj[ keys ]).pop();
}

const fiatCoinReducer = handleActions({
  [ FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS ]: (
    state,
    { payload: { status, data } }
  ) => newState(
    state, 'priceHistorical', getValueNestedObject( data ), status
  ),
  [ FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS ]: (
    state,
    { payload: { status, data } }
  ) => newState(
    state, 'priceMulti', data, status
  ),
  [ FETCH_CRYPTOCOMPARE_API_FAILED ]: (
    state,
    { payload: { status, message } }
  ) => newStateFailed(
    state, message, status
  )
}, initialApiState );

export default fiatCoinReducer;
