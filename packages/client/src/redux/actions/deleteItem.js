import { createAction } from 'redux-actions';
import {
  DELETE_API_ITEM_REQUEST,
  DELETE_API_ITEM_SUCCESS,
  DELETE_API_ITEM_FAILED
} from '../constants';

const deleteApiItemRequest = createAction(
  DELETE_API_ITEM_REQUEST
);

const deleteApiItemSuccess = createAction(
  DELETE_API_ITEM_SUCCESS,
  ( status, data ) => ({ status, data })
);

const deleteApiItemFailed = createAction(
  DELETE_API_ITEM_FAILED,
  ( status, message ) => ({ status, message })
);

export {
  deleteApiItemRequest,
  deleteApiItemSuccess,
  deleteApiItemFailed
};
