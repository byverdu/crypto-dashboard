/* global describe, it */

import { expect } from 'chai';
import * as actions from '../../app/src/redux/constants';
import { apiReducer } from '../../app/src/redux/reducers';

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

describe( 'Reducers', () => {
  describe( 'apiReducer', () => {
    it( 'is defined', () => {
      expect( apiReducer ).not.to.eq( undefined );
    });
    it( 'initial state should be an empty array', () => {
      expect( apiReducer( undefined, {})).to.eql([]);
    });
    it( 'should handle ADD_ITEM_TO_API action', () => {
      const newItem = {
        type: actions.ADD_ITEM_TO_API,
        data: mockData[ 0 ]
      };

      expect( apiReducer([], newItem )).to.eql([newItem.data]);
      expect( apiReducer([{}], newItem )).to.have.length( 2 );
    });
    it( 'should handle FETCH_DATA_API action, for resolved promise', () => {
      const newItem = {
        type: actions.FETCH_DATA_API,
        fetched: true,
        data: mockData
      };
      expect( apiReducer([], newItem )).to.have.length( 2 );
    });
    it( 'should handle FETCH_DATA_API action, for rejected promise', () => {
      const newItem = {
        type: actions.FETCH_DATA_API,
        fetched: false,
        data: mockData
      };
      expect( apiReducer([], newItem )).to.have.length( 0 );
    });
  });
});

