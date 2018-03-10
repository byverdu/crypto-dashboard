import * as actions from './constants';

const initialApiState = {
  status: 0,
  data: []
};

export function apiReducer( state = initialApiState, action ) {
  let newState;
  switch ( action.type ) {
    case actions.API_DATA_FETCHED:

      newState = Object.assign( state, {
        data: state.data.concat( action.data ),
        status: action.status
      });
      return newState;

    case actions.API_DATA_FETCH_FAILED:

      newState = Object.assign( state, {
        message: action.message,
        status: action.status
      });
      return newState;

    case actions.ITEM_ADDED_TO_API:

      newState = {
        data: action.data,
        status: action.status
      };
      return newState;

    case actions.ITEM_ADDED_TO_API_FAILED:

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
