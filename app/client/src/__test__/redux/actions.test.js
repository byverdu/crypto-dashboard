/* global describe, it */

import { expect } from 'chai';
import * as actions from '../../redux/actions';

describe( 'Action creators', () => {
  describe( 'fetchApiDataRequest', () => {
    it( 'is defined', () => {
      expect( actions.fetchApiDataRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchApiDataRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_REQUEST' );
    });
  });
  describe( 'fetchApiDataSuccess', () => {
    it( 'is defined', () => {
      expect( actions.fetchApiDataSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchApiDataSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.fetchApiDataSuccess( 200, []))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "data"', () => {
      expect( actions.fetchApiDataSuccess( 200, []))
        .to.have.property( 'data' )
        .that.is.a( 'array' );
    });
  });
  describe( 'fetchApiDataFailed', () => {
    it( 'is defined', () => {
      expect( actions.fetchApiDataFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchApiDataFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.fetchApiDataFailed( 404, 'failed', [])).to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( actions.fetchApiDataFailed( 404, 'failed', [])).to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'addItemToApiRequest', () => {
    it( 'is defined', () => {
      expect( actions.addItemToApiRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.addItemToApiRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_REQUEST' );
    });
  });
  describe( 'addItemToApiSuccess', () => {
    it( 'is defined', () => {
      expect( actions.addItemToApiSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.addItemToApiSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_SUCCESS' );
    });
    it( 'returns a "payload" with props "status" and "data"', () => {
      expect( actions.addItemToApiSuccess( 200, {}))
        .to.have.property( 'payload' )
        .that.is.an( 'object' )
        .and.eql({ status: 200, data: {} });
    });
  });
  describe( 'addItemToApiFailed', () => {
    it( 'is defined', () => {
      expect( actions.addItemToApiFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.addItemToApiFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_FAILED' );
    });
    it( 'returns a "payload" with props "status" and "message"', () => {
      expect( actions.addItemToApiFailed( 404, 'failed', []))
        .to.have.property( 'payload' )
        .that.is.an( 'object' )
        .and.eql({ status: 404, message: 'failed' });
    });
  });
  describe( 'deleteApiItemRequest', () => {
    it( 'is defined', () => {
      expect( actions.deleteApiItemRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.deleteApiItemRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_REQUEST' );
    });
  });
  describe( 'deleteApiItemSuccess', () => {
    it( 'is defined', () => {
      expect( actions.deleteApiItemSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.deleteApiItemSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.deleteApiItemSuccess( 200, 2 ))
        .to.have.property( 'status' )
        .to.eq( 200 );
    });
    it( 'returns an object with property "data"', () => {
      expect( actions.deleteApiItemSuccess( 200, []))
        .to.have.property( 'data' )
        .to.eql([]);
    });
  });
  describe( 'deleteApiItemFailed', () => {
    it( 'is defined', () => {
      expect( actions.deleteApiItemFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.deleteApiItemFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.deleteApiItemFailed( 404, 'failed', []))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( actions.deleteApiItemFailed( 404, 'failed', []))
        .to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'fetchCryptocompareApiRequest', () => {
    it( 'is defined', () => {
      expect( actions.fetchCryptocompareApiRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchCryptocompareApiRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_API_REQUEST' );
    });
  });
  describe( 'fetchCryptocompareMultiApiSuccess', () => {
    it( 'is defined', () => {
      expect( actions.fetchCryptocompareMultiApiSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchCryptocompareMultiApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.fetchCryptocompareMultiApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "priceMulti"', () => {
      const response = {
        ETH: {
          USD: 594.75,
          GBP: 444.22
        },
        ADA: {
          USD: 0.205,
          GBP: 0.1531
        }
      };
      expect( actions.fetchCryptocompareMultiApiSuccess( 200, response ))
        .to.have.property( 'priceMulti' )
        .that.is.a( 'object' )
        .and.eql( response );
    });
  });
  describe( 'fetchCryptocompareApiRequest', () => {
    it( 'is defined', () => {
      expect( actions.fetchCryptocompareApiRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchCryptocompareApiRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_API_REQUEST' );
    });
  });
  describe( 'fetchCryptocompareHistoricalApiSuccess', () => {
    it( 'is defined', () => {
      expect( actions.fetchCryptocompareHistoricalApiSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchCryptocompareHistoricalApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.fetchCryptocompareHistoricalApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "priceHistorical" for historical endpoint', () => {
      expect( actions.fetchCryptocompareHistoricalApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'priceHistorical' )
        .that.is.a( 'number' )
        .and.eq( 200 );
    });
  });
  describe( 'fetchCryptocompareApiFailed', () => {
    it( 'is defined', () => {
      expect( actions.fetchCryptocompareApiFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchCryptocompareApiFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_API_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.fetchCryptocompareApiFailed( 404, 'failed' ))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "data"', () => {
      expect( actions.fetchCryptocompareApiFailed( 404, 'failed' ))
        .to.have.property( 'message' )
        .that.is.an( 'string' );
    });
  });
  describe( 'editApiItemRequest', () => {
    it( 'is defined', () => {
      expect( actions.editApiItemRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.editApiItemRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'EDIT_API_ITEM_REQUEST' );
    });
  });
  describe( 'editApiItemSuccess', () => {
    it( 'is defined', () => {
      expect( actions.editApiItemSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.editApiItemSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'EDIT_API_ITEM_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.editApiItemSuccess( 200, 2 ))
        .to.have.property( 'status' )
        .to.eq( 200 );
    });
    it( 'returns an object with property "data"', () => {
      expect( actions.editApiItemSuccess( 200, []))
        .to.have.property( 'data' )
        .to.eql([]);
    });
  });
  describe( 'editApiItemFailed', () => {
    it( 'is defined', () => {
      expect( actions.editApiItemFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.editApiItemFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'EDIT_API_ITEM_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.editApiItemFailed( 404, 'failed', []))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( actions.editApiItemFailed( 404, 'failed', []))
        .to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'fetchExchangesNameRequest', () => {
    it( 'is defined', () => {
      expect( actions.fetchExchangesNameRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchExchangesNameRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_EXCHANGES_REQUEST' );
    });
  });
  describe( 'fetchExchangesNameSuccess', () => {
    it( 'is defined', () => {
      expect( actions.fetchExchangesNameSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchExchangesNameSuccess( 200, []))
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_EXCHANGES_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.fetchExchangesNameSuccess( 200, []))
        .to.have.property( 'status' )
        .to.eq( 200 );
    });
    it( 'returns an object with property "data"', () => {
      expect( actions.fetchExchangesNameSuccess( 200, []))
        .to.have.property( 'data' )
        .to.eql([]);
    });
  });
  describe( 'fetchExchangesNameFailed', () => {
    it( 'is defined', () => {
      expect( actions.fetchExchangesNameFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( actions.fetchExchangesNameFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_EXCHANGES_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( actions.fetchExchangesNameFailed( 404, 'failed' ))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( actions.fetchExchangesNameFailed( 404, 'failed' ))
        .to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
});
