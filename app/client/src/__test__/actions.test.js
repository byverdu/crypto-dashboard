/* global describe, it */

import { expect } from 'chai';
import {
  fetchApiDataRequest,
  fetchApiDataSuccess,
  fetchApiDataFailed,
  addItemToApiRequest,
  addItemToApiSuccess,
  addItemToApiFailed,
  deleteApiItemRequest,
  deleteApiItemSuccess,
  deleteApiItemFailed
} from '../redux/actions';

describe( 'Action creators', () => {
  describe( 'fetchApiDataRequest', () => {
    it( 'is defined', () => {
      expect( fetchApiDataRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( fetchApiDataRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_REQUEST' );
    });
  });
  describe( 'fetchApiDataSuccess', () => {
    it( 'is defined', () => {
      expect( fetchApiDataSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( fetchApiDataSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( fetchApiDataSuccess( 200, []))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "data"', () => {
      expect( fetchApiDataSuccess( 200, []))
        .to.have.property( 'data' )
        .that.is.a( 'array' );
    });
  });
  describe( 'fetchApiDataFailed', () => {
    it( 'is defined', () => {
      expect( fetchApiDataFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( fetchApiDataFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( fetchApiDataFailed( 404, 'failed', [])).to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( fetchApiDataFailed( 404, 'failed', [])).to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'addItemToApiRequest', () => {
    it( 'is defined', () => {
      expect( addItemToApiRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( addItemToApiRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_REQUEST' );
    });
  });
  describe( 'addItemToApiSuccess', () => {
    it( 'is defined', () => {
      expect( addItemToApiSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( addItemToApiSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_SUCCESS' );
    });
    it( 'returns an object with property "data"', () => {
      expect( addItemToApiSuccess( 200, {}))
        .to.have.property( 'data' )
        .that.is.an( 'object' );
    });
    it( 'returns an object with property "status"', () => {
      expect( addItemToApiSuccess( 200, {}))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
  });
  describe( 'addItemToApiFailed', () => {
    it( 'is defined', () => {
      expect( addItemToApiFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( addItemToApiFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( addItemToApiFailed( 404, 'failed', [])).to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( addItemToApiFailed( 404, 'failed', [])).to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'deleteApiItemRequest', () => {
    it( 'is defined', () => {
      expect( deleteApiItemRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( deleteApiItemRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_REQUEST' );
    });
  });
  describe( 'deleteApiItemSuccess', () => {
    it( 'is defined', () => {
      expect( deleteApiItemSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( deleteApiItemSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( deleteApiItemSuccess( 200, 2 ))
        .to.have.property( 'status' )
        .to.eq( 200 );
    });
    it( 'returns an object with property "data"', () => {
      expect( deleteApiItemSuccess( 200, []))
        .to.have.property( 'data' )
        .to.eql([]);
    });
  });
  describe( 'deleteApiItemFailed', () => {
    it( 'is defined', () => {
      expect( deleteApiItemFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( deleteApiItemFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( deleteApiItemFailed( 404, 'failed', [])).to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( deleteApiItemFailed( 404, 'failed', [])).to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
});
