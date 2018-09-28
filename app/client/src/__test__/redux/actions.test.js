/* global describe, it */

import { expect } from 'chai';
import * as actions from '../../redux/actions';

const testSuites = [
  { key: 'fetchApiDataRequest', type: 'FETCH_API_DATA_REQUEST' },
  { key: 'fetchApiDataSuccess', type: 'FETCH_API_DATA_SUCCESS', payload: [200, {}] },
  { key: 'fetchApiDataFailed', type: 'FETCH_API_DATA_FAILED', payload: [404, 'failed'] },
  { key: 'addItemToApiRequest', type: 'ADD_ITEM_TO_API_REQUEST' },
  { key: 'addItemToApiSuccess', type: 'ADD_ITEM_TO_API_SUCCESS', payload: [200, {}] },
  { key: 'addItemToApiFailed', type: 'ADD_ITEM_TO_API_FAILED', payload: [404, 'failed'] },
  { key: 'deleteApiItemRequest', type: 'DELETE_API_ITEM_REQUEST' },
  { key: 'deleteApiItemSuccess', type: 'DELETE_API_ITEM_SUCCESS', payload: [200, {}] },
  { key: 'deleteApiItemFailed', type: 'DELETE_API_ITEM_FAILED', payload: [404, 'failed'] },
  { key: 'editApiItemRequest', type: 'EDIT_API_ITEM_REQUEST' },
  { key: 'editApiItemSuccess', type: 'EDIT_API_ITEM_SUCCESS', payload: [200, {}] },
  { key: 'editApiItemFailed', type: 'EDIT_API_ITEM_FAILED', payload: [404, 'failed'] },
  { key: 'fetchExchangesNameRequest', type: 'FETCH_EXCHANGES_REQUEST' },
  { key: 'fetchExchangesNameSuccess', type: 'FETCH_EXCHANGES_SUCCESS', payload: [200, {}] },
  { key: 'fetchExchangesNameFailed', type: 'FETCH_EXCHANGES_FAILED', payload: [404, 'failed'] }
];

const payloadBuilder = ( payload ) => {
  const tempObj = {
    status: payload[ 0 ]
  };
  if ( payload[ 0 ] === 200 ) {
    tempObj.data = payload[ 1 ];
  } else {
    tempObj.message = payload[ 1 ];
  }

  return tempObj;
};

describe( 'Actions creators', () => {
  testSuites.forEach(( suite ) => {
    const { key, type, payload } = suite;
    describe( `${key}`, () => {
      it( 'should be defined', () => {
        expect( actions[ key ]).not.eq( undefined );
      });
      it( `should have object with "type" prop equal to ${type}`, () => {
        expect( actions[ key ]())
          .to.have.property( 'type' )
          .and.eq( type );
      });

      if ( payload ) {
        it( 'should have object with "payload" prop', () => {
          expect( actions[ key ]( payload[ 0 ], payload[ 1 ]))
            .to.have.property( 'payload' )
            .and.eql( payloadBuilder( payload ));
        });
      }
    });
  });
});


describe( 'Action creators', () => {
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
});
