import { handleActions } from 'redux-actions';
import * as actionsType from '../constants';
import { mergeReducers } from '../../clientUtils';

const initialApiState = {
  status: 0,
  trades: [],
  message: ''
};

const editReducer = handleActions({
  [ actionsType.EDIT_TRADE_ITEM_SUCCESS ]: (
    state,
    { payload: { data, status } }
  ) => {
    const oldData = state.trades.filter(item => item.uuid !== data.uuid)
    const newData = [...oldData, data];
    return {
      ...state,
      message: 'Item trade edited from API',
      status,
      trades: newData
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
      fetchTradesReducer,
      editReducer
    );
    
    export default tradesReducer;