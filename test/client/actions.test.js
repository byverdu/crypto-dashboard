/* global describe, it */

import { expect } from 'chai';
import {
  fetchApiData,
  addItemToApi
} from '../../app/src/redux/actions';

describe( 'Action creators', () => {
  describe( 'fetchApiData', () => {
    it( 'is defined', () => {
      expect( fetchApiData ).not.to.eq( undefined );
    });
    it( 'returns an object with property "type"', () => {
      expect( fetchApiData()).to.be.an( 'Object' )
        .and.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'FETCH_DATA_API' );
    });
    it( 'returns an object with property "fetched"', () => {
      expect( fetchApiData( true, [])).to.be.an( 'Object' )
        .and.have.property( 'fetched' )
        .that.is.a( 'boolean' );
    });
    it( 'returns an object with property "data"', () => {
      expect( fetchApiData( true, [])).to.be.an( 'Object' )
        .and.have.property( 'data' )
        .that.is.an( 'array' );
    });
    describe( 'addItemToApi', () => {
      it( 'is defined', () => {
        expect( addItemToApi ).not.to.eq( undefined );
      });
      it( 'returns an object with property "type"', () => {
        expect( addItemToApi()).to.be.an( 'Object' )
          .and.have.property( 'type' )
          .that.is.a( 'string' )
          .and.eq( 'ADD_ITEM_TO_API' );
      });
      it( 'returns an object with property "data"', () => {
        expect( addItemToApi({})).to.be.an( 'Object' )
          .and.have.property( 'data' )
          .that.is.an( 'object' );
      });
    });
  });
});
