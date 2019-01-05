import { createAction } from 'redux-actions';
import {
  FETCH_API_DATA_REQUEST,
  FETCH_API_DATA_SUCCESS,
  FETCH_API_DATA_FAILED,
  UPDATE_TOTAL_INVESTED,
  UPDATE_TOTAL_PROFIT_LOST
} from '../constants';

const fetchApiDataRequest = createAction(
  FETCH_API_DATA_REQUEST
);

const fetchApiDataSuccess = createAction(
  FETCH_API_DATA_SUCCESS,
  ( status, data ) => ({ status, data })
);

const fetchApiDataFailed = createAction(
  FETCH_API_DATA_FAILED,
  ( status, message ) => ({ status, message })
);

const updateTotalInvested = createAction(
  UPDATE_TOTAL_INVESTED
);

const updateTotalProgitLost = createAction(
  UPDATE_TOTAL_PROFIT_LOST
);

export {
  fetchApiDataRequest,
  fetchApiDataSuccess,
  fetchApiDataFailed,
  updateTotalInvested,
  updateTotalProgitLost
};
