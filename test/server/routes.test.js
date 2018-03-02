/* global describe, it */

import { expect } from 'chai';
import request from 'supertest';

import server from '../../app/server';

describe( 'Application routes', () => {
  describe( 'Home Page', () => {
    it( 'is defined', ( done ) => {
      request( server )
        .get( '/' )
        .expect( 200 )
        .end(( err, res ) => {
          if ( err ) done( err );
          expect( res.type ).to.eq( 'text/html' );
          expect( res.text ).to.include( 'Crypto Dashboard' );
          done();
        });
    });
    // it( 'accepts post requests', ( done ) => {
    //   request( server )
    //     .post( '/' )
    //     .expect( 200 )
    //     .end(( err, res ) => {
    //       if ( err ) done( err );
    //       expect( res.type ).to.eq( 'text/html' );
    //       expect( res.text ).to.include( '<h1>Crypto Dashboard</h1>' );
    //       done();
    //     });
    // });
  });
});
