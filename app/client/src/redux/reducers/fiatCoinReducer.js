import * as actionsType from '../constants';
import { newState, newStateFailed } from '../../clientUtils';

const initialApiState = {
  status: 0,
  priceMulti: {},
  priceHistorical: 0,
  message: ''
};

export default function fiatCoinReducer( state = initialApiState, action ) {
  switch ( action.type ) {
    case actionsType.FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS:
      return newState(
        state, 'priceHistorical', action.priceHistorical, action.status
      );

    case actionsType.FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS:
      return newState(
        state, 'priceMulti', action.priceMulti, action.status
      );

    case actionsType.FETCH_CRYPTOCOMPARE_API_FAILED:
      return newStateFailed(
        state, action.message, action.status
      );

    default:
      return state;
  }
}
