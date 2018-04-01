/* global describe, it, beforeEach, afterEach */

import { expect } from 'chai';
import * as actions from '../../redux/constants';
import apiReducer from '../../redux/reducers';
import mockData from '../mockData';

let initialApiState;

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
    it( 'should handle FETCH_API_DATA_SUCCESS action, for resolved promise', () => {
      const newItem = {
        type: actions.FETCH_API_DATA_SUCCESS,
        status: 200,
        data: mockData.reducers
      };
      const newState = {
        status: 200,
        data: mockData.reducers
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
        message: 'Request failed with status code 404'
      };
      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
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
        message: 'Request failed with status code 404'
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle DELETE_API_ITEM_SUCCESS action', () => {
      initialApiState.data = mockData.reducers;
      const newItem = {
        type: actions.DELETE_API_ITEM_SUCCESS,
        status: 200,
        data: [mockData.reducers[ 1 ]]
      };

      const newState = {
        data: [mockData.reducers[ 1 ]],
        status: 200
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
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
      message: 'Request failed with status code 404'
    };

    expect( apiReducer( initialApiState, newItem )).to.eql( newState );
  });
});

