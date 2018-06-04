import * as actionsType from '../constants';
import { newStateSuccess, newStateFailed } from '../../clientUtils';

const initialApiState = {
  status: 0,
  data: [],
  message: ''
};

export default function apiReducer( state = initialApiState, action ) {
  switch ( action.type ) {
    case actionsType.FETCH_API_DATA_SUCCESS:
      return newStateSuccess(
        state, action.data, action.status, 'Data fetched from API'
      );

    case actionsType.ADD_ITEM_TO_API_SUCCESS:
      return newStateSuccess(
        state, action.data, action.status, 'Item added to API'
      );

    case actionsType.DELETE_API_ITEM_SUCCESS:
      return newStateSuccess(
        state, action.data, action.status, 'Item deleted from API'
      );

    case actionsType.EDIT_API_ITEM_SUCCESS:
      return newStateSuccess(
        state, action.data, action.status, 'Item edited from API'
      );

    case actionsType.FETCH_API_DATA_FAILED:
    case actionsType.ADD_ITEM_TO_API_FAILED:
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
