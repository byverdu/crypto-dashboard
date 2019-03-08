import { handleActions, handleAction, combineActions } from 'redux-actions';
import * as actionsType from '../constants';
import { newStateSuccess, newStateFailed, mergeReducers } from '../../clientUtils';

const initialApiState = {
  status: 0,
  trades: [],
  message: ''
};

const addReducer = handleActions({
  [ actionsType.ADD_ITEM_TO_API_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => {
    const newData = [...state.data, data];
    return {
      ...state,
      message: 'Item added to API',
      status,
      data: newData
    }
  }
}, initialApiState );

const fetchTradesReducer = handleActions({
  [ actionsType.FETCH_TRADES_DATA_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => ({
    ...state,
    status,
    trades: data,
    message: 'Trades fetched from API'
  })
}, initialApiState );

    const tradesReducer = mergeReducers(
      fetchTradesReducer
    );
    
    export default tradesReducer;