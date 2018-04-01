
import { combineReducers } from 'redux';
import apiReducer from './reducers';
import * as actions from './actions';

const cryptoReducers = combineReducers({
  api: apiReducer
});

export {
  cryptoReducers,
  actions
};
