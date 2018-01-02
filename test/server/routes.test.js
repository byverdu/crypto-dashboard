import {
  describe, it, expect, request
} from '../testSetup';
import server from '../../app/server';

describe( 'Application routes', () => {
  describe( 'Index route', () => {
    it( 'is defined', ( done ) => {
      request( server )
        .get( '/' )
        .expect( 200 )
        .end(( err, res ) => {
          if ( err ) done( err );
          expect( res.type ).to.eq( 'text/html' );
          expect( res.text ).to.include( '<h1>Crypto Dashboard Login</h1>' );
          done();
        });
    });
  });
});
