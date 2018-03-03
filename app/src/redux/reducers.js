import * as actions from './constants';

const initialApiState = [];

export function apiReducer( state = initialApiState, action ) {
  switch ( action.type ) {
    case actions.FETCH_DATA_API:
      return action.fetched ? state.concat( action.data ) : state;

    case actions.ADD_ITEM_TO_API:
      return state.concat( action.data );
    default:
      return state;
  }
}
