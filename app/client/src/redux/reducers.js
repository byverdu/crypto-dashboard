import * as actionsType from './constants';

const initialApiState = {
  status: 0,
  data: []
};

const newStateSuccess = ( data, status ) => ({ data, status });
const newStateFailure = ( state, message, status ) => ({ ...state, message, status });

export function apiReducer( state = initialApiState, action ) {
  switch ( action.type ) {
    case actionsType.FETCH_API_DATA_SUCCESS:
      return newStateSuccess(
        action.data, action.status
      );

    case actionsType.FETCH_API_DATA_FAILED:
      return newStateFailure(
        state, action.message, action.status
      );

    case actionsType.ADD_ITEM_TO_API_SUCCESS:
      return newStateSuccess(
        [...state.data, action.data], action.status
      );

    case actionsType.ADD_ITEM_TO_API_FAILED:
      return newStateFailure(
        state, action.message, action.status
      );

    case actionsType.DELETE_API_ITEM_SUCCESS: {
      const newData = state.data.filter(( item, position ) => position !== action.position );

      return newStateSuccess(
        newData, action.status
      );
    }

    case actionsType.DELETE_API_ITEM_FAILED:
      return newStateFailure(
        state, action.message, action.status
      );

    default:
      return state;
  }
}

export function jol() {
}
