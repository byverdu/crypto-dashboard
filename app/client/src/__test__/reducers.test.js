/* global describe, it, beforeEach, afterEach */

import { expect } from 'chai';
import * as actions from '../redux/constants';
import { apiReducer } from '../redux/reducers';

let initialApiState;
const mockData = [
  {
    nameCrypto: 'btc',
    amountCrypto: '0.0004',
    priceCrypto: '0.0004',
    fiatCrypto: 'dollar',
    dateCrypto: '2018-02-11'
  },
  {
    nameCrypto: 'eth',
    amountCrypto: '67',
    priceCrypto: '23',
    fiatCrypto: 'dollar',
    dateCrypto: '2018-02-09'
  }
];

beforeEach(() => {
  initialApiState = {
    status: 0,
    data: []
  };
});

afterEach(() => {
  initialApiState = {
    status: 0,
    data: []
  };
});

describe( 'Reducers', () => {
  describe( 'apiReducer', () => {
    it( 'is defined', () => {
      expect( apiReducer ).not.to.eq( undefined );
    });
    it( 'initial state should be an empty array', () => {
      expect( apiReducer( initialApiState, {})).to.eql( initialApiState );
    });
    it( 'should handle API_DATA_FETCHED action, for resolved promise', () => {
      const newItem = {
        type: actions.API_DATA_FETCHED,
        status: 200,
        data: mockData
      };
      const newState = {
        status: 200,
        data: mockData
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle FETCH_DATA_API action, for rejected promise', () => {
      const newItem = {
        type: actions.API_DATA_FETCH_FAILED,
        status: 404,
        message: 'Request failed with status code 404'
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404'
      };
      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle ITEM_ADDED_TO_API action', () => {
      const newItem = {
        type: actions.ITEM_ADDED_TO_API,
        status: 200,
        data: [mockData[ 0 ]]
      };

      expect( apiReducer( initialApiState, newItem ).data ).to.have.length( 1 );
    });
    it( 'should handle ITEM_ADDED_TO_API_FAILED action', () => {
      const newItem = {
        type: actions.ITEM_ADDED_TO_API_FAILED,
        status: 404,
        message: 'Request failed with status code 404'
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404'
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
});

