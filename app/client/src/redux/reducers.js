import * as actions from './constants';

const initialApiState = {
  status: 0,
  data: []
};

const newStateSuccess = ( data, status ) => ({ data, status });
const newStateFailure = ( state, message, status ) => ({ ...state, message, status });

export function apiReducer( state = initialApiState, action ) {
  switch ( action.type ) {
    case actions.FETCH_API_DATA_SUCCESS:
      return newStateSuccess(
        action.data, action.status
      );

    case actions.FETCH_API_DATA_FAILED:
      return newStateFailure(
        state, action.message, action.status
      );

    case actions.ADD_ITEM_TO_API_SUCCESS:
      return newStateSuccess(
        action.data, action.status
      );

    case actions.ADD_ITEM_TO_API_FAILED:
      return newStateFailure(
        state, action.message, action.status
      );

    default:
      return state;
  }
}

export function jol() {
}
