import { handleActions } from 'redux-actions';
import * as actionsType from '../constants';
import { mergeReducers, getTotalInvested, calculateTradingValue } from '../../clientUtils';

const initialApiState = {
  totalInvested: 0,
  profitLostData: [],
  totalProfitLost: 0,
  data: [],
  pairsToSubscribe: [],
  pairsToUnsubscribe: [],
  tradesLenght: 0,
  compareApiData: []
};

const eventSource = handleActions({
  [actionsType.EVENT_SOURCE_RECEIVED]: (
    state,
    {payload}
  ) => ({
      ...state,
      compareApiData: payload,
      tradesLenght: payload.length
  })
}, initialApiState)

const updateTotalInvested = handleActions({
  [ actionsType.UPDATE_TOTAL_INVESTED ]: (
    state,
    { payload: {body, type} }
  ) => {
    let data;
    switch (type) {
      case 'get':
        data = body;
        break;
      case 'add':
        data = [...state.data, body]
        break;
      case 'delete':
        data = state.data.filter(item => item.uuid !== body.uuid);
        break;
      default:
        break;

    }

    return {
      ...state,
      data,
      totalInvested: getTotalInvested( data ),
      pairsToSubscribe: data.map( item => ({ pairToWatch: item.pairToWatch, subscribed: false }))
    }
  },

  [ actionsType.UPDATE_TOTAL_PROFIT_LOST ]: (
    state
  ) => {
    const {data, compareApiData } = state;

    const tempProfitLost = data.map(( item ) => {
      const price = compareApiData.find(pair => pair.pairToWatch === item.pairToWatch).PRICE;
      return calculateTradingValue( item.amountCrypto, price );
    });

    const totalProfitLost = tempProfitLost.reduce(
      ( prev, curr ) => prev += Number( curr ),
      0 );

    return {
      ...state,
      totalProfitLost
    };
  },

  [ actionsType.UPDATE_SUBSCRIPTIONS ]: ( state, { payload }) => ({
    ...state,
    pairsToSubscribe: payload
  }),

  [ actionsType.UNSUBSCRIBE ]: ( state, { payload }) => {
    const pairsToUnsubscribe = state.pairsToSubscribe.filter( item => item.pairToWatch === payload.pairToWatch ).map( item => item.pairToWatch );
    const pairsTosubscribe = state.pairsToSubscribe.filter( item => item.pairToWatch !== payload.pairToWatch ).map( item => ({ pairToWatch: item.pairToWatch, subscribed: false }));

    return {
      ...state,
      pairsToUnsubscribe,
      pairsTosubscribe
    };
  }

}, initialApiState );

const tileSectionReducer = mergeReducers(
  updateTotalInvested,
  eventSource
);

export default tileSectionReducer;
