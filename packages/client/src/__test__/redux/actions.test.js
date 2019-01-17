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
  { key: 'fetchExchangesNameFailed', type: 'FETCH_EXCHANGES_FAILED', payload: [404, 'failed'] },
  { key: 'fetchCryptocompareApiRequest', type: 'FETCH_CRYPTOCOMPARE_API_REQUEST' },
  { key: 'fetchCryptocompareMultiApiSuccess', type: 'FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS', payload: [200, { ETH: { USD: 200 } }] },
  { key: 'fetchCryptocompareHistoricalApiSuccess', type: 'FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS', payload: [200, { ETH: { USD: 200 } }] },
  { key: 'fetchCryptocompareApiFailed', type: 'FETCH_CRYPTOCOMPARE_API_FAILED', payload: [404, 'failed'] }
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
