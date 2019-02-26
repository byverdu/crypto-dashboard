import { handleActions, handleAction, combineActions } from 'redux-actions';
import * as actionsType from '../constants';
import { newStateSuccess, newStateFailed, mergeReducers } from '../../clientUtils';

const initialApiState = {
  status: 0,
  data: [],
  message: ''
};

const addReducer = handleActions({
  [ actionsType.ADD_ITEM_TO_API_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => {
    const newData = [...state.data, data];
    return {
      ...state,
      message: 'Item added to API',
      status,
      data: newData
    }
  }
}, initialApiState );

const editReducer = handleActions({
  [ actionsType.EDIT_API_ITEM_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => {
    const oldData = state.data.filter(item => item.uuid !== data.uuid)
    const newData = [...oldData, data];
    return {
      ...state,
      message: 'Item edited from API',
      status,
      data: newData
    }
  }
}, initialApiState );

const deleteReducer = handleActions({
  [actionsType.DELETE_API_ITEM_SUCCESS]: (
    state,
    {payload: {data, status}}
  ) => {
    const newData = state.data.filter(item => item.uuid !== data.uuid);
    
    return {
      ...state,
      message: 'Item deleted from API',
      status,
      data: newData
    }
  }
}, initialApiState)

const failedApiCallReducer = handleAction(
  combineActions(
    actionsType.ADD_ITEM_TO_API_FAILED,
    actionsType.EDIT_API_ITEM_FAILED,
    actionsType.DELETE_API_ITEM_FAILED,
    actionsType.FETCH_API_DATA_FAILED
  ),
  (
    state,
    { payload: { message, status } }
  ) => newStateFailed(
    state, message, status), initialApiState);



// const addItemsReducer = handleActions({
//   [ actionsType.ADD_ITEM_TO_API_FAILED ]: (
//     state,
//     { payload: { message, status } }
//   ) => newStateFailed(
//     state, message, status
//   )
// }, initialApiState );

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

// const deleteItemReducer = handleActions({
//   [ actionsType.DELETE_API_ITEM_FAILED ]: (
//     state,
//     { payload: { message, status } }
//   ) => newStateFailed(
//     state, message, status
//   )
// }, initialApiState );

// const editItemReducer = handleActions({
//   [ actionsType.EDIT_API_ITEM_FAILED ]: (
//     state,
//     { payload: { message, status } }
//   ) => newStateFailed(
//     state, message, status
//   )
// }, initialApiState );

const apiReducer = mergeReducers(
  // addItemsReducer,
  fetchApiReducer,
  // deleteItemReducer,
  // editItemReducer,
  failedApiCallReducer,
  addReducer,
  deleteReducer,
  editReducer
);

export default apiReducer;
