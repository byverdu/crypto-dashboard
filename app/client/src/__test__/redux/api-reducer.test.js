/* global describe, it, beforeEach, afterEach */

import { expect } from 'chai';
import * as actions from '../../redux/constants';
import apiReducer from '../../redux/reducers/apiReducer';
import mockData from '../mockData';

let initialApiState;

beforeEach(() => {
  initialApiState = {
    status: 0,
    data: [],
    priceMulti: {},
    priceHistorical: 0,
    message: ''
  };
});

afterEach(() => {
  initialApiState = {
    status: 0,
    data: [],
    priceMulti: {},
    priceHistorical: 0,
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
    const newItemSuccess = {
      type: actions.FETCH_API_DATA_SUCCESS,
      payload: {
        status: 200,
        data: []
      }
    };
    const newStateSuccess = {
      status: 200,
      data: [],
      priceMulti: {},
      priceHistorical: 0,
      message: ''
    };
    it( 'should handle FETCH_API_DATA_SUCCESS action, for resolved promise and no data saved', () => {
      newStateSuccess.message = 'No data saved in portfolio';

      expect( apiReducer( initialApiState, newItemSuccess )).to.eql( newStateSuccess );
    });
    it( 'should handle FETCH_API_DATA_SUCCESS action, for resolved promise and some data saved', () => {
      newStateSuccess.message = 'Data fetched from API';
      newItemSuccess.payload.data = mockData.reducers;
      newStateSuccess.data = mockData.reducers;

      expect( apiReducer( initialApiState, newItemSuccess )).to.eql( newStateSuccess );
    });
    it( 'should handle FETCH_API_DATA_FAILED action, for rejected promise', () => {
      const newItem = {
        type: actions.FETCH_API_DATA_FAILED,
        payload: {
          status: 404,
          message: 'Request failed with status code 404'
        }
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404',
        priceMulti: {},
        priceHistorical: 0
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
  describe( 'ADD_ITEM_TO_API', () => {
    it( 'should handle ADD_ITEM_TO_API_SUCCESS action', () => {
      const newItem = {
        type: actions.ADD_ITEM_TO_API_SUCCESS,
        payload: {
          status: 200,
          data: [mockData.reducers[ 0 ]]
        }
      };

      const newState = {
        data: [mockData.reducers[ 0 ]],
        status: 200,
        priceMulti: {},
        priceHistorical: 0,
        message: 'Item added to API'
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle ADD_ITEM_TO_API_FAILED action', () => {
      const newItem = {
        type: actions.ADD_ITEM_TO_API_FAILED,
        payload: {
          status: 404,
          message: 'Request failed with status code 404'
        }
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404',
        priceMulti: {},
        priceHistorical: 0
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
  describe( 'DELETE_API_ITEM', () => {
    it( 'should handle DELETE_API_ITEM_SUCCESS action', () => {
      initialApiState.data = mockData.reducers;
      const newItem = {
        type: actions.DELETE_API_ITEM_SUCCESS,
        payload: {
          status: 200,
          data: [mockData.reducers[ 1 ]]
        }
      };

      const newState = {
        data: [mockData.reducers[ 1 ]],
        status: 200,
        priceMulti: {},
        priceHistorical: 0,
        message: 'Item deleted from API'
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
    it( 'should handle DELETE_API_ITEM_FAILED action', () => {
      const newItem = {
        type: actions.DELETE_API_ITEM_FAILED,
        payload: {
          status: 404,
          message: 'Request failed with status code 404'
        }
      };

      const newState = {
        status: 404,
        data: [],
        message: 'Request failed with status code 404',
        priceMulti: {},
        priceHistorical: 0
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
        priceMulti: {},
        priceHistorical: 0,
        message: 'Item edited from API'
      };

      expect( apiReducer(
        { ...initialApiState, data: [mockData.reducers[ 1 ]] }, newItem
      )).to.eql( newState );
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
        priceMulti: {},
        priceHistorical: 0
      };

      expect( apiReducer( initialApiState, newItem )).to.eql( newState );
    });
  });
});

