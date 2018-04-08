/* global describe, it, beforeEach, afterEach */

import { expect } from 'chai';
import * as actions from '../../redux/constants';
import apiReducer from '../../redux/reducers';
import mockData from '../mockData';

let initialApiState;

beforeEach(() => {
  initialApiState = {
    status: 0,
    data: [],
    priceValue: {},
    message: ''
  };
});

afterEach(() => {
  initialApiState = {
    status: 0,
    data: [],
    priceValue: {},
    message: ''
  };
});

describe( 'apiReducer', () => {
  it( 'is defined', () => {
    expect( apiReducer ).not.to.eq( undefined );
  });
  it( 'initial state should be an empty array', () => {
    expect( apiReducer( initialApiState, {})).to.eql( initialApiState );
  });
  describe( 'FETCH_API_DATA', () => {
    it( 'should handle FETCH_API_DATA_SUCCESS action, for resolved promise', () => {
      const newItem = {
        type: actions.FETCH_API_DATA_SUCCESS,
        status: 200,
        data: mockData.reducers
      };
      const newState = {
        status: 200,
        data: mockData.reducers,
        priceValue: {},
        message: ''
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle FETCH_API_DATA_FAILED action, for rejected promise', () => {
      const newItem = {
        type: actions.FETCH_API_DATA_FAILED,
        status: 404,
        message: 'Request failed with status code 404'
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404',
        priceValue: {}
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
  describe( 'ADD_ITEM_TO_API', () => {
    it( 'should handle ADD_ITEM_TO_API_SUCCESS action', () => {
      const newItem = {
        type: actions.ADD_ITEM_TO_API_SUCCESS,
        status: 200,
        data: [mockData.reducers[ 0 ]]
      };

      expect( apiReducer( initialApiState, newItem ).data ).to.have.length( 1 );
    });
    it( 'should handle ADD_ITEM_TO_API_FAILED action', () => {
      const newItem = {
        type: actions.ADD_ITEM_TO_API_FAILED,
        status: 404,
        message: 'Request failed with status code 404'
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404',
        priceValue: {}
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
  describe( 'DELETE_API_ITEM', () => {
    it( 'should handle DELETE_API_ITEM_SUCCESS action', () => {
      initialApiState.data = mockData.reducers;
      const newItem = {
        type: actions.DELETE_API_ITEM_SUCCESS,
        status: 200,
        data: [mockData.reducers[ 1 ]]
      };

      const newState = {
        data: [mockData.reducers[ 1 ]],
        status: 200,
        priceValue: {},
        message: ''
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle DELETE_API_ITEM_FAILED action', () => {
      const newItem = {
        type: actions.DELETE_API_ITEM_FAILED,
        status: 404,
        message: 'Request failed with status code 404'
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404',
        priceValue: {}
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
  describe( 'FETCH_CRYPTOCOMPARE_API', () => {
    it( 'should handle FETCH_CRYPTOCOMPARE_API_REQUEST action, for resolved promise', () => {
      const newItem = {
        type: actions.FETCH_CRYPTOCOMPARE_API_REQUEST,
        status: 200,
        priceValue: mockData.reducersFetchApi
      };
      const newState = {
        status: 200,
        data: [],
        priceValue: mockData.reducersFetchApi,
        message: ''
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle FETCH_CRYPTOCOMPARE_API_FAILED action', () => {
      const newItem = {
        type: actions.FETCH_CRYPTOCOMPARE_API_FAILED,
        status: 404,
        message: 'Request failed with status code 404'
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404',
        priceValue: {}
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
  describe( 'EDIT_API_ITEM', () => {
    it( 'should handle EDIT_API_ITEM_SUCCESS action', () => {
      initialApiState.data = mockData.reducers;
      const newItem = {
        type: actions.EDIT_API_ITEM_SUCCESS,
        status: 200,
        data: [mockData.reducers[ 0 ]]
      };

      const newState = {
        data: [mockData.reducers[ 0 ]],
        status: 200,
        priceValue: {},
        message: ''
      };

      expect( apiReducer({ ...initialApiState, data: [mockData.reducers[ 1 ]] }, newItem )).to.eql( newState );
    });
    it( 'should handle EDIT_API_ITEM_FAILED action', () => {
      const newItem = {
        type: actions.EDIT_API_ITEM_FAILED,
        status: 404,
        message: 'Request failed with status code 404'
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404',
        priceValue: {}
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
});

