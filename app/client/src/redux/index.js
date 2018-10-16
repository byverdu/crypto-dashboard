
import { combineReducers } from 'redux';
import { apiReducer, formReducer, fiatCoinReducer } from './reducers/';
import * as actions from './actions';

const cryptoReducers = combineReducers({
  apiReducer,
  formReducer,
  fiatCoinReducer
});

export {
  cryptoReducers,
  actions
};
