/* global describe, it */

import { expect } from 'chai';
import * as utils from '../../redux/actions';

describe( 'Action creators', () => {
  describe( 'fetchApiDataRequest', () => {
    it( 'is defined', () => {
      expect( utils.fetchApiDataRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchApiDataRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_REQUEST' );
    });
  });
  describe( 'fetchApiDataSuccess', () => {
    it( 'is defined', () => {
      expect( utils.fetchApiDataSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchApiDataSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.fetchApiDataSuccess( 200, []))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "data"', () => {
      expect( utils.fetchApiDataSuccess( 200, []))
        .to.have.property( 'data' )
        .that.is.a( 'array' );
    });
  });
  describe( 'fetchApiDataFailed', () => {
    it( 'is defined', () => {
      expect( utils.fetchApiDataFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchApiDataFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_API_DATA_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.fetchApiDataFailed( 404, 'failed', [])).to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( utils.fetchApiDataFailed( 404, 'failed', [])).to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'addItemToApiRequest', () => {
    it( 'is defined', () => {
      expect( utils.addItemToApiRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.addItemToApiRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_REQUEST' );
    });
  });
  describe( 'addItemToApiSuccess', () => {
    it( 'is defined', () => {
      expect( utils.addItemToApiSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.addItemToApiSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_SUCCESS' );
    });
    it( 'returns an object with property "data"', () => {
      expect( utils.addItemToApiSuccess( 200, {}))
        .to.have.property( 'data' )
        .that.is.an( 'object' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.addItemToApiSuccess( 200, {}))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
  });
  describe( 'addItemToApiFailed', () => {
    it( 'is defined', () => {
      expect( utils.addItemToApiFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.addItemToApiFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'ADD_ITEM_TO_API_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.addItemToApiFailed( 404, 'failed', [])).to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( utils.addItemToApiFailed( 404, 'failed', [])).to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'deleteApiItemRequest', () => {
    it( 'is defined', () => {
      expect( utils.deleteApiItemRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.deleteApiItemRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_REQUEST' );
    });
  });
  describe( 'deleteApiItemSuccess', () => {
    it( 'is defined', () => {
      expect( utils.deleteApiItemSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.deleteApiItemSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.deleteApiItemSuccess( 200, 2 ))
        .to.have.property( 'status' )
        .to.eq( 200 );
    });
    it( 'returns an object with property "data"', () => {
      expect( utils.deleteApiItemSuccess( 200, []))
        .to.have.property( 'data' )
        .to.eql([]);
    });
  });
  describe( 'deleteApiItemFailed', () => {
    it( 'is defined', () => {
      expect( utils.deleteApiItemFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.deleteApiItemFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DELETE_API_ITEM_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.deleteApiItemFailed( 404, 'failed', []))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( utils.deleteApiItemFailed( 404, 'failed', []))
        .to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'fetchCryptocompareApiRequest', () => {
    it( 'is defined', () => {
      expect( utils.fetchCryptocompareApiRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchCryptocompareApiRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_API_REQUEST' );
    });
  });
  describe( 'fetchCryptocompareMultiApiSuccess', () => {
    it( 'is defined', () => {
      expect( utils.fetchCryptocompareMultiApiSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchCryptocompareMultiApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.fetchCryptocompareMultiApiSuccess( 200, { ETH: { USD: 200 } }))
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
      expect( utils.fetchCryptocompareMultiApiSuccess( 200, response ))
        .to.have.property( 'priceMulti' )
        .that.is.a( 'object' )
        .and.eql( response );
    });
  });
  describe( 'fetchCryptocompareApiRequest', () => {
    it( 'is defined', () => {
      expect( utils.fetchCryptocompareApiRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchCryptocompareApiRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_API_REQUEST' );
    });
  });
  describe( 'fetchCryptocompareHistoricalApiSuccess', () => {
    it( 'is defined', () => {
      expect( utils.fetchCryptocompareHistoricalApiSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchCryptocompareHistoricalApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.fetchCryptocompareHistoricalApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "priceHistorical" for historical endpoint', () => {
      expect( utils.fetchCryptocompareHistoricalApiSuccess( 200, { ETH: { USD: 200 } }))
        .to.have.property( 'priceHistorical' )
        .that.is.a( 'number' )
        .and.eq( 200 );
    });
  });
  describe( 'fetchCryptocompareApiFailed', () => {
    it( 'is defined', () => {
      expect( utils.fetchCryptocompareApiFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchCryptocompareApiFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_CRYPTOCOMPARE_API_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.fetchCryptocompareApiFailed( 404, 'failed' ))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "data"', () => {
      expect( utils.fetchCryptocompareApiFailed( 404, 'failed' ))
        .to.have.property( 'message' )
        .that.is.an( 'string' );
    });
  });
  describe( 'editApiItemRequest', () => {
    it( 'is defined', () => {
      expect( utils.editApiItemRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.editApiItemRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'EDIT_API_ITEM_REQUEST' );
    });
  });
  describe( 'editApiItemSuccess', () => {
    it( 'is defined', () => {
      expect( utils.editApiItemSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.editApiItemSuccess())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'EDIT_API_ITEM_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.editApiItemSuccess( 200, 2 ))
        .to.have.property( 'status' )
        .to.eq( 200 );
    });
    it( 'returns an object with property "data"', () => {
      expect( utils.editApiItemSuccess( 200, []))
        .to.have.property( 'data' )
        .to.eql([]);
    });
  });
  describe( 'editApiItemFailed', () => {
    it( 'is defined', () => {
      expect( utils.editApiItemFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.editApiItemFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'EDIT_API_ITEM_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.editApiItemFailed( 404, 'failed', []))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( utils.editApiItemFailed( 404, 'failed', []))
        .to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
  describe( 'fetchExchangesNameRequest', () => {
    it( 'is defined', () => {
      expect( utils.fetchExchangesNameRequest ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchExchangesNameRequest())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_EXCHANGES_REQUEST' );
    });
  });
  describe( 'fetchExchangesNameSuccess', () => {
    it( 'is defined', () => {
      expect( utils.fetchExchangesNameSuccess ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchExchangesNameSuccess( 200, []))
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_EXCHANGES_SUCCESS' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.fetchExchangesNameSuccess( 200, []))
        .to.have.property( 'status' )
        .to.eq( 200 );
    });
    it( 'returns an object with property "data"', () => {
      expect( utils.fetchExchangesNameSuccess( 200, []))
        .to.have.property( 'data' )
        .to.eql([]);
    });
  });
  describe( 'fetchExchangesNameFailed', () => {
    it( 'is defined', () => {
      expect( utils.fetchExchangesNameFailed ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( utils.fetchExchangesNameFailed())
        .to.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_EXCHANGES_FAILED' );
    });
    it( 'returns an object with property "status"', () => {
      expect( utils.fetchExchangesNameFailed( 404, 'failed' ))
        .to.have.property( 'status' )
        .that.is.a( 'number' );
    });
    it( 'returns an object with property "message"', () => {
      expect( utils.fetchExchangesNameFailed( 404, 'failed' ))
        .to.have.property( 'message' )
        .that.is.a( 'string' );
    });
  });
});
