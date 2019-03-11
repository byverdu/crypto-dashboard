import { createAction } from 'redux-actions';
import {
  EDIT_TRADE_ITEM_REQUEST,
  EDIT_TRADE_ITEM_SUCCESS,
  EDIT_TRADE_ITEM_FAILED
} from '../constants';

const editTradeItemRequest = createAction(
  EDIT_TRADE_ITEM_REQUEST
);

const editTradeItemSuccess = createAction(
  EDIT_TRADE_ITEM_SUCCESS,
  ( status, data ) => ({ status, data })
);

const editTradeItemFailed = createAction(
  EDIT_TRADE_ITEM_FAILED,
  ( status, message ) => ({ status, message })
);


export {
  editTradeItemRequest,
  editTradeItemSuccess,
  editTradeItemFailed
};
