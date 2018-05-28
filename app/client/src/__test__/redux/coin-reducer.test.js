/* global describe, it, beforeEach, afterEach */

import { expect } from 'chai';
import * as actions from '../../redux/constants';
import fiatCoinReducer from '../../redux/reducers/fiatCoinReducer';
import mockData from '../mockData';

let initialApiState;

beforeEach(() => {
  initialApiState = {
    status: 0,
    priceMulti: {},
    priceHistorical: 0,
    message: ''
  };
});

afterEach(() => {
  initialApiState = {
    status: 0,
    priceMulti: {},
    priceHistorical: 0,
    message: ''
  };
});

describe( 'fiatCoinReducer', () => {
  it( 'is defined', () => {
    expect( fiatCoinReducer ).not.to.eq( undefined );
  });
  it( 'initial state should be an empty array', () => {
    expect( fiatCoinReducer( initialApiState, {})).to.eql( initialApiState );
  });
  describe( 'FETCH_CRYPTOCOMPARE_API', () => {
    it( 'should handle FETCH_CRYPTOCOMPARE_MULTI_API_REQUEST action, for resolved promise', () => {
      const newItem = {
        type: actions.FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS,
        status: 200,
        priceMulti: mockData.reducersFetchApi.priceMulti
      };
      const newState = {
        status: 200,
        priceMulti: mockData.reducersFetchApi.priceMulti,
        priceHistorical: 0,
        message: ''
      };

      expect( fiatCoinReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle FETCH_CRYPTOCOMPARE_HISTORICAL_API_REQUEST action, for resolved promise', () => {
      const newItem = {
        type: actions.FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS,
        status: 200,
        priceHistorical: mockData.reducersFetchApi.priceHistorical
      };
      const newState = {
        status: 200,
        priceHistorical: mockData.reducersFetchApi.priceHistorical,
        priceMulti: {},
        message: ''
      };

      expect( fiatCoinReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle FETCH_CRYPTOCOMPARE_API_FAILED action', () => {
      const newItem = {
        type: actions.FETCH_CRYPTOCOMPARE_API_FAILED,
        status: 404,
        message: 'Request failed with status code 404'
      };

      const newState = {
        status: 404,
        message: 'Request failed with status code 404',
        priceMulti: {},
        priceHistorical: 0
      };

      expect( fiatCoinReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
});
