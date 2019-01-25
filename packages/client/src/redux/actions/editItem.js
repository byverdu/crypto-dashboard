import { createAction } from 'redux-actions';
import {
  EDIT_API_ITEM_REQUEST,
  EDIT_API_ITEM_SUCCESS,
  EDIT_API_ITEM_FAILED
} from '../constants';

const editApiItemRequest = createAction(
  EDIT_API_ITEM_REQUEST
);

const editApiItemSuccess = createAction(
  EDIT_API_ITEM_SUCCESS,
  ( status, data ) => ({ status, data })
);

const editApiItemFailed = createAction(
  EDIT_API_ITEM_FAILED,
  ( status, message ) => ({ status, message })
);


export {
  editApiItemRequest,
  editApiItemSuccess,
  editApiItemFailed
};
