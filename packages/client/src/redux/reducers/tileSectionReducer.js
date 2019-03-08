import { handleActions } from 'redux-actions';
import * as actionsType from '../constants';
import { mergeReducers, getTotalInvested, calculateTradingValue, getCryptoPriceForFiat, test } from '../../clientUtils';

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

    console.log(payload, 'tileSectionReducer.js')

    return {
      ...state,
      compareApiData: payload,
      tradesLenght: payload.length
    }
  }
  
  // ({
  //     ...state,
  //     compareApiData: payload,
  //     tradesLenght: payload.length
  // })
}, initialApiState);


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

    if (state.compareApiData.length > 0) {
      data.forEach(element => {
        // const price = getCryptoPriceForFiat(data, state.compareApiData);
        const {amountInvested, fiatName} = element;
        if (fiatName !== 'NA') {
          element.amountInvested = (test(element, state.compareApiData ) * amountInvested)
        }

      });
    }

    return {
      ...state,
      data,
      totalInvested: getTotalInvested( data )
    }
  },

  [ actionsType.UPDATE_TOTAL_PROFIT_LOST ]: (
    state
  ) => {
    const {data, compareApiData } = state;
    let price;

    const tempProfitLost = data.map(( item ) => {
      if (item.fiatName !== 'NA') {
        price = test(item, compareApiData);
      } else {
        const newPrice = compareApiData.find(pair => pair.pairToWatch === item.pairToWatch);
        price = newPrice ? newPrice.PRICE: 0;
      }

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
