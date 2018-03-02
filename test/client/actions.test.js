/* global describe, it */

import { expect } from 'chai';
import {
  dataFetched
} from '../../app/src/redux/actions';

describe( 'Action creators', () => {
  describe( 'dataFetched', () => {
    it( 'is defined', () => {
      expect( dataFetched ).not.to.eq( undefined );
    });
    it( 'returns an object', () => {
      expect( dataFetched()).to.be.an( 'Object' );
    });
    it( 'returns an object with property "type"', () => {
      expect( dataFetched()).to.be.an( 'Object' )
        .and.have.property( 'type' )
        .that.is.a( 'string' )
        .and.eq( 'DATA_FETCHED' );
    });
    it( 'returns an object with property "fetched"', () => {
      expect( dataFetched( true, [])).to.be.an( 'Object' )
        .and.have.property( 'fetched' )
        .that.is.a( 'boolean' );
    });
    it( 'returns an object with property "data"', () => {
      expect( dataFetched( true, [])).to.be.an( 'Object' )
        .and.have.property( 'data' )
        .that.is.an( 'array' );
    });
  });
});
