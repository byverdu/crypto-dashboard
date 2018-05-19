import * as actionsType from '../constants';

const inialState = {
  data: {},
  message: '',
  status: 0
};

export default function formReducer( state = inialState, action ) {
  switch ( action.type ) {
    case actionsType.FETCH_EXCHANGES_SUCCESS:
      return {
        ...state,
        data: action.data,
        status: action.status
      };

    case actionsType.FETCH_EXCHANGES_FAILED:
      return {
        ...state,
        message: action.message,
        status: action.status
      };

    default:
      return state;
  }
}
