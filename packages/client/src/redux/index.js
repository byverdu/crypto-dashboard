
import { combineReducers } from 'redux';
import { apiReducer, formReducer, fiatCoinReducer, tileSectionReducer, tradesReducer } from './reducers/';
import * as actions from './actions';

const cryptoReducers = combineReducers({
  apiReducer,
  formReducer,
  fiatCoinReducer,
  tileSectionReducer,
  tradesReducer
});

export {
  cryptoReducers,
  actions
};
