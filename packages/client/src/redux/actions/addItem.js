import { createAction } from 'redux-actions';
import {
  ADD_ITEM_TO_API_REQUEST,
  ADD_ITEM_TO_API_SUCCESS,
  ADD_ITEM_TO_API_FAILED
} from '../constants';

const addItemToApiRequest = createAction(
  ADD_ITEM_TO_API_REQUEST
);

const addItemToApiSuccess = createAction(
  ADD_ITEM_TO_API_SUCCESS,
  ( status, data ) => ({ status, data })
);

const addItemToApiFailed = createAction(
  ADD_ITEM_TO_API_FAILED,
  ( status, message ) => ({ status, message })
);

export {
  addItemToApiRequest,
  addItemToApiSuccess,
  addItemToApiFailed
};
