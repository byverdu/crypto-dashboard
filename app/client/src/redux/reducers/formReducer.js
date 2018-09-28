import { handleActions } from 'redux-actions';
import { FETCH_EXCHANGES_SUCCESS, FETCH_EXCHANGES_FAILED } from '../constants';

const inialState = {
  data: {},
  message: '',
  status: 0
};

const formReducer = handleActions({
  [ FETCH_EXCHANGES_SUCCESS ]: (
    state,
    { payload: { status, data } }
  ) => ({
    ...state,
    data,
    status
  }),
  [ FETCH_EXCHANGES_FAILED ]: (
    state,
    { payload: { status, message } }
  ) => ({
    ...state,
    message,
    status
  })
}, inialState );

export default formReducer;
