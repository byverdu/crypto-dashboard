import { createAction } from 'redux-actions';
import {
  FETCH_EXCHANGES_REQUEST,
  FETCH_EXCHANGES_SUCCESS,
  FETCH_EXCHANGES_FAILED
} from '../constants';

const fetchExchangesNameRequest = createAction(
  FETCH_EXCHANGES_REQUEST
);

const fetchExchangesNameSuccess = createAction(
  FETCH_EXCHANGES_SUCCESS,
  ( status, data ) => ({ status, data })
);

const fetchExchangesNameFailed = createAction(
  FETCH_EXCHANGES_FAILED,
  ( status, message ) => ({ status, message })
);

export {
  fetchExchangesNameRequest,
  fetchExchangesNameSuccess,
  fetchExchangesNameFailed
};
