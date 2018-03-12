import * as actions from './constants';

const initialApiState = {
  status: 0,
  data: []
};

export function apiReducer( state = initialApiState, action ) {
  let newState;
  switch ( action.type ) {
    case actions.FETCH_API_DATA_SUCCESS:

      newState = {
        data: action.data,
        status: action.status
      };
      return newState;

    case actions.FETCH_API_DATA_FAILED:

      newState = Object.assign( state, {
        message: action.message,
        status: action.status
      });
      return newState;

    case actions.ADD_ITEM_TO_API_SUCCESS:

      newState = {
        data: action.data,
        status: action.status
      };
      return newState;

    case actions.ADD_ITEM_TO_API_FAILED:

      newState = Object.assign( state, {
        message: action.message,
        status: action.status
      });
      return newState;

    default:
      return state;
  }
}

export function jol() {
}
