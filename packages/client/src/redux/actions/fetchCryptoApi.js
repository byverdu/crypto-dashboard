import { createAction } from 'redux-actions';
import * as actionsType from '../constants';

const fetchCryptocompareApiRequest = createAction(
  actionsType.FETCH_CRYPTOCOMPARE_API_REQUEST
);

const fetchCryptocompareHistoricalApiSuccess = createAction(
  actionsType.FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS,
  ( status, data ) => ({ status, data })
);

const fetchCryptocompareMultiApiSuccess = createAction(
  actionsType.FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS,
  ( status, data ) => ({ status, data })
);

const fetchCryptocompareApiFailed = createAction(
  actionsType.FETCH_CRYPTOCOMPARE_API_FAILED,
  ( status, message ) => ({ status, message })
);

export {
  fetchCryptocompareApiRequest,
  fetchCryptocompareHistoricalApiSuccess,
  fetchCryptocompareMultiApiSuccess,
  fetchCryptocompareApiFailed
};
