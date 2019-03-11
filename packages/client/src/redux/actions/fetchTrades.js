import { createAction } from 'redux-actions';
import {
  FETCH_TRADES_DATA_SUCCESS,
} from '../constants';

const fetchTradesDataSuccess = createAction(
  FETCH_TRADES_DATA_SUCCESS,
  ( status, data ) => ({ status, data })
);

export {
  fetchTradesDataSuccess
};
