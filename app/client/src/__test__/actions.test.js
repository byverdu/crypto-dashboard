/* global describe, it */

import { expect } from 'chai';
import {
  apiDataFetched,
  apiDataFetchFailed,
  itemAddedToApi,
  itemAddedToApiFailed
} from '../redux/actions';

describe( 'Action creators', () => {
  describe( 'apiDataFetched', () => {
    it( 'is defined', () => {
      expect( apiDataFetched ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( apiDataFetched())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'API_DATA_FETCHED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( apiDataFetched( 200, []))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "data"', () => {
      expect( apiDataFetched( 200, []))
        .to.have.property( 'data' )
        .that.is.a( 'array' );
    });
  });
  describe( 'apiDataFetchFailed', () => {
    it( 'is defined', () => {
      expect( apiDataFetchFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( apiDataFetchFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'API_DATA_FETCH_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( apiDataFetchFailed( 404, 'failed', [])).to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( apiDataFetchFailed( 404, 'failed', [])).to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'itemAddedToApi', () => {
    it( 'is defined', () => {
      expect( itemAddedToApi ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( itemAddedToApi())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ITEM_ADDED_TO_API' );
    });
    it( 'returns an object with property "data"', () => {
      expect( itemAddedToApi( 200, {}))
        .to.have.property( 'data' )
        .that.is.an( 'object' );
    });
    it( 'returns an object with property "status"', () => {
      expect( itemAddedToApi( 200, {}))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
  });
  describe( 'itemAddedToApiFailed', () => {
    it( 'is defined', () => {
      expect( itemAddedToApiFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( itemAddedToApiFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ITEM_ADDED_TO_API_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( itemAddedToApiFailed( 404, 'failed', [])).to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( itemAddedToApiFailed( 404, 'failed', [])).to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
});
