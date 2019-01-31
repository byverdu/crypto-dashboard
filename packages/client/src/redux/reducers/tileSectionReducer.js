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
  ) => {
    let compareApiData = [];
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        compareApiData = [...compareApiData, {[key]: payload[key]}];
        
      }
    }
    const tradesLenght = compareApiData.length;

    return {
      ...state,
      compareApiData,
      tradesLenght
    }
  }
}, initialApiState)

const updateTotalInvested = handleActions({
  [ actionsType.UPDATE_TOTAL_INVESTED ]: (
    state,
    { payload }
  ) => {
    let data;
    if (Array.isArray(payload)) {
      data = payload;
    } else {
      data = [...state.data, payload];
    }

    return {
      ...state,
      data,
      totalInvested: getTotalInvested( data ),
      pairsToSubscribe: data.map( item => ({ pairToWatch: item.pairToWatch, subscribed: false }))
    }
  },

  [ actionsType.UPDATE_DATA_TOTAL_PROFIT_LOST ]: (
    state,
    { payload }
  ) => {
    const profitLostData = state.profitLostData.filter( item => !payload.pairToWatch.includes( item.pairToWatch ));
    const totalProfitLost = state.data.reduce(
      ( prev, curr ) => prev += Number( curr.profitLost ),
      0 );

    return {
      ...state,
      profitLostData,
      totalProfitLost
    };
  },

  [ actionsType.UPDATE_TOTAL_PROFIT_LOST ]: (
    state,
    { payload }
  ) => {
    let profitLostData = state.profitLostData.slice();
    const data = state.data.slice();
    const index = profitLostData.findIndex(( item ) => {
      console.log( item );
      return item.pairToWatch === payload.pairToWatch;
    });

    if ( index === -1 ) {
      profitLostData = [...profitLostData, payload];
    } else {
      profitLostData.splice( index, 1, payload );
    }

    data.map(( item ) => {
      if ( item.pairToWatch.includes( payload.pairToWatch )) {
        item.profitLost = calculateTradingValue( item.amountCrypto, payload.price );
      }

      return item;
    });

    const totalProfitLost = data.reduce(
      ( prev, curr ) => prev += Number( curr.profitLost ),
      0 );

    return {
      ...state,
      profitLostData,
      totalProfitLost,
      data
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
