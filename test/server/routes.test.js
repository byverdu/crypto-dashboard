/* global describe, it */

import { expect } from 'chai';
import request from 'supertest';

import server from '../../app/server';
import { USERNAME, PASSWORD } from '../../app/config';

describe( 'Application routes', () => {
  describe( 'Login route', () => {
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
    it( 'accepts post requests', ( done ) => {
      request( server )
        .post( '/' )
        .send({ userName: USERNAME, password: PASSWORD })
        .expect( 200 )
        .end(( err, res ) => {
          if ( err ) done( err );
          expect( res.type ).to.eq( 'text/html' );
          expect( res.text ).to.include( '<h1>Crypto Dashboard</h1>' );
          done();
        });
    });
  });
});
