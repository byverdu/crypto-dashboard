
import { combineReducers } from 'redux';
import { apiReducer, formReducer, fiatCoinReducer, tileSectionReducer } from './reducers/';
import * as actions from './actions';

const cryptoReducers = combineReducers({
  apiReducer,
  formReducer,
  fiatCoinReducer,
  tileSectionReducer
});

export {
  cryptoReducers,
  actions
};
