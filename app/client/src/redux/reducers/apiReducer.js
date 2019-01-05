import { handleActions } from 'redux-actions';
import * as actionsType from '../constants';
import { newStateSuccess, newStateFailed, mergeReducers, getTotalInvested } from '../../clientUtils';

const initialApiState = {
  status: 0,
  data: [],
  message: '',
  totalInvested: 0,
  totalProfitLost: 0
};

const addItemsReducer = handleActions({
  [ actionsType.ADD_ITEM_TO_API_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => newStateSuccess(
    state, data, status, 'Item added to API'
  ),
  [ actionsType.ADD_ITEM_TO_API_FAILED ]: (
    state,
    { payload: { message, status } }
  ) => newStateFailed(
    state, message, status
  )
}, initialApiState );

const fetchApiReducer = handleActions({
  [ actionsType.FETCH_API_DATA_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => newStateSuccess(
    state, data, status, 'Data fetched from API'
  ),
  [ actionsType.FETCH_API_DATA_FAILED ]: (
    state,
    { payload: { message, status } }
  ) => newStateFailed(
    state, message, status
  )
}, initialApiState );

const deleteItemReducer = handleActions({
  [ actionsType.DELETE_API_ITEM_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => newStateSuccess(
    state, data, status, 'Item deleted from API'
  ),
  [ actionsType.DELETE_API_ITEM_FAILED ]: (
    state,
    { payload: { message, status } }
  ) => newStateFailed(
    state, message, status
  )
}, initialApiState );

const editItemReducer = handleActions({
  [ actionsType.EDIT_API_ITEM_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => newStateSuccess(
    state, data, status, 'Item edited from API'
  ),
  [ actionsType.EDIT_API_ITEM_FAILED ]: (
    state,
    { payload: { message, status } }
  ) => newStateFailed(
    state, message, status
  )
}, initialApiState );

const updateTotalInvested = handleActions({
  [ actionsType.UPDATE_TOTAL_INVESTED ]: (
    state,
    { payload }
  ) => ({
    ...state,
    totalInvested: getTotalInvested( payload )
  }),
  [ actionsType.UPDATE_TOTAL_PROFIT_LOST ]: (
    state,
    { payload }
  ) => ({
    ...state,
    totalProfitLost: Number( payload )
  })
}, initialApiState );

const apiReducer = mergeReducers(
  addItemsReducer,
  fetchApiReducer,
  deleteItemReducer,
  editItemReducer,
  updateTotalInvested
);

export default apiReducer;
