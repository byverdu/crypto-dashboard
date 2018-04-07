/* global describe, it, afterAll */

import { expect } from 'chai';
import request from 'supertest';

import server from '../index';
import {
  CRYPTOFILE_PATH
} from '../../config/server';

const { promisify } = require( 'util' );
const fs = require( 'fs' );

const readFileAsync = promisify( fs.readFile );

const cryptoData = {
  nameCrypto: 'eth',
  amountCrypto: '67',
  priceCrypto: '23',
  fiatCrypto: 'dollar',
  dateCrypto: '2018-02-09'
};

const cryptoDataEdit = {
  cryptoToRemove: 0,
  data: {
    nameCrypto: 'btc',
    amountCrypto: '67',
    priceCrypto: '23',
    fiatCrypto: 'dollar',
    dateCrypto: '2018-02-09'
  }
};

afterAll(() => {
  readFileAsync(
    CRYPTOFILE_PATH,
    { encoding: 'utf8' }
  ).then(() => {
    const newData = JSON.stringify([]);
    fs.writeFile(
      CRYPTOFILE_PATH,
      newData,
      ( err ) => {
        if ( err ) {
          throw new Error( `Write DELETE JSON error: ${err}` );
        }
        console.log( 'write file resolved after delete' );
      }
    );
    console.log( 'readfile DELETE resolved' );
  }).catch(( err ) => {
    throw new Error( `Read DELETE JSON error: ${err}` );
  });
});

describe( 'Application routes for Crypto Dashboard', () => {
  it( 'Renders Home Page', ( done ) => {
    request( server )
      .get( '/' )
      .expect( 200 )
      .end(( err, res ) => {
        if ( err ) done( err );
        expect( res.type ).to.eq( 'text/html' );
        expect( res.text ).to.include( '<title>Crypto Dashboard</title>' );
        done();
      });
  });
  it( 'An API endpoint is enabled', ( done ) => {
    request( server )
      .get( '/api/crypto' )
      .expect( 200 )
      .end(( err, res ) => {
        if ( err ) done( err );
        expect( res.type ).to.include( 'json' );
        expect( res.body ).to.be.an( 'array' );
        expect( res.body ).to.have.length( 0 );
        done();
      });
  });
  it( 'accepts post requests', ( done ) => {
    request( server )
      .post( '/api/crypto' )
      .send( cryptoData )
      .expect( 200 )
      .end(( err, res ) => {
        if ( err ) done( err );
        expect( res.type ).to.include( 'json' );
        expect( res.body ).to.be.an( 'array' );
        expect( res.body ).to.have.length.above( 0 );
        done();
      });
  });
  it( 'accepts delete requests', ( done ) => {
    request( server )
      .delete( '/api/crypto' )
      .send({ cryptoToRemove: 0 })
      .expect( 200 )
      .end(( err, res ) => {
        if ( err ) done( err );
        expect( res.type ).to.include( 'json' );
        expect( res.body ).to.be.an( 'array' );
        expect( res.body ).to.have.length( 0 );
        done();
      });
  });
  it( 'accepts put requests', ( done ) => {
    request( server )
      .put( '/api/crypto' )
      .send( cryptoDataEdit )
      .expect( 200 )
      .end(( err, res ) => {
        if ( err ) done( err );
        expect( res.type ).to.include( 'json' );
        expect( res.body ).to.be.an( 'array' );
        expect( res.body[ 0 ].nameCrypto ).to.be.eq( cryptoDataEdit.data.nameCrypto );
        done();
      });
  });
});
