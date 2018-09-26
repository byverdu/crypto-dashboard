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

function reducer( state = initialApiState, action ) {
  switch ( action.type ) {
    case actionsType.FETCH_API_DATA_SUCCESS:
      return newStateSuccess(
        state, action.data, action.status, 'Data fetched from API'
      );

    case actionsType.ADD_ITEM_TO_API_SUCCESS: {
      const { payload: { data, status } } = action;
      return newStateSuccess(
        state, data, status, 'Item added to API'
      );
    }

    case actionsType.DELETE_API_ITEM_SUCCESS:
      return newStateSuccess(
        state, action.data, action.status, 'Item deleted from API'
      );

    case actionsType.EDIT_API_ITEM_SUCCESS:
      return newStateSuccess(
        state, action.data, action.status, 'Item edited from API'
      );

    case actionsType.FETCH_API_DATA_FAILED:
    case actionsType.DELETE_API_ITEM_FAILED:
    case actionsType.FETCH_CRYPTOCOMPARE_API_FAILED:
    case actionsType.EDIT_API_ITEM_FAILED:
      return newStateFailed(
        state, action.message, action.status
      );

    default:
      return state;
  }
}

const apiReducer = mergeReducers( reducer, addItemsReducer );

export default apiReducer;
