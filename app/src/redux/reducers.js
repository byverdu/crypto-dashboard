import * as actions from './constants';

const initialApiState = [];

export function apiReducer ( state = initialApiState, action ) {
  switch( action.type ) {
  case actions.ADD_ITEM_TO_API:
    return [ ...state, action.data ];
  default:
    return state;
  }
}
