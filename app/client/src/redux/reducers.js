import * as actionsType from './constants';
import { newState } from '../clientUtils';

const initialApiState = {
  status: 0,
  data: [],
  priceValue: {},
  message: ''
};

export default function apiReducer( state = initialApiState, action ) {
  switch ( action.type ) {
    case actionsType.FETCH_API_DATA_SUCCESS:
      return newState(
        state, 'data', action.data, action.status
      );

    case actionsType.FETCH_API_DATA_FAILED:
      return newState(
        state, 'message', action.message, action.status
      );

    case actionsType.ADD_ITEM_TO_API_SUCCESS:
      return newState(
        state, 'data', action.data, action.status
      );

    case actionsType.ADD_ITEM_TO_API_FAILED:
      return newState(
        state, 'message', action.message, action.status
      );

    case actionsType.DELETE_API_ITEM_SUCCESS: {
      return newState(
        state, 'data', action.data, action.status
      );
    }

    case actionsType.DELETE_API_ITEM_FAILED:
      return newState(
        state, 'message', action.message, action.status
      );

    default:
      return state;
  }
}
