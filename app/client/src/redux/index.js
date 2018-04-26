
import { combineReducers } from 'redux';
import * as reducers from './reducers/';
import * as actions from './actions';

const cryptoReducers = combineReducers({
  api: reducers.apiReducer,
  form: reducers.formReducer
});

export {
  cryptoReducers,
  actions
};
