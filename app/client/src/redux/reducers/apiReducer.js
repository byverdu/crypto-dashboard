import { handleActions } from 'redux-actions';
import mergeReducers from 'merge-reducers';
import * as actionsType from '../constants';
import { newStateSuccess, newStateFailed } from '../../clientUtils';

const initialApiState = {
  status: 0,
  data: [],
  message: ''
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

function reducer( state = initialApiState, action ) {
  switch ( action.type ) {
    case actionsType.ADD_ITEM_TO_API_SUCCESS: {
      const { payload: { data, status } } = action;
      return newStateSuccess(
        state, data, status, 'Item added to API'
      );
    }
    case actionsType.EDIT_API_ITEM_SUCCESS:
      return newStateSuccess(
        state, action.data, action.status, 'Item edited from API'
      );

    case actionsType.FETCH_CRYPTOCOMPARE_API_FAILED:
    case actionsType.EDIT_API_ITEM_FAILED:
      return newStateFailed(
        state, action.message, action.status
      );

    default:
      return state;
  }
}

const apiReducer = mergeReducers(
  reducer,
  addItemsReducer,
  fetchApiReducer,
  deleteItemReducer
);

export default apiReducer;
