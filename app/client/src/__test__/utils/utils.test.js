/* global describe, it */
import { expect } from 'chai';
import {
  FIAT_SIGN, FIAT_THREE_CODE_LETTER, API_URL
} from '../../config/client';
import {
  calculateTradingValue,
  getFiatSign,
  getFiatCodeLetter,
  getAPIUrl,
  calculateProfitLost,
  getInputFieldValues,
  hasRequiredField,
  fetchConfig,
  isTradeProfitable,
  getValueWithFiatSign
} from '../../clientUtils';
import mockData from '../mockData';

describe( 'Utils methods', () => {
  it( 'has a calculateTradingValue method', () => {
    expect( calculateTradingValue )
      .not.eq( undefined );
  });
  it( 'calculateTradingValue multiplies amount and price and returns 3 decimal digits', () => {
    const { amount, price_1 } = mockData.utils;
    expect( calculateTradingValue( amount, price_1 ))
      .to.be.a( 'string' )
      .and.eq( '22.50000' );
  });
  it( 'has a getFiatSign method', () => {
    expect( getFiatSign )
      .not.eq( undefined );
  });
  it( 'getFiatSign returns the proper fiat sign', () => {
    mockData.utils.possibleFiat.forEach(( fiat ) => {
      expect( getFiatSign( fiat ))
        .to.eq( FIAT_SIGN[ fiat ]);
    });
  });
  it( 'has a getFiatCodeLetter method', () => {
    expect( getFiatCodeLetter )
      .not.eq( undefined );
  });
  it( 'getFiatCodeLetter returns the proper 3 code letter for a fiat', () => {
    mockData.utils.possibleFiat.forEach(( fiat ) => {
      expect( getFiatCodeLetter( fiat ))
        .and.eq( FIAT_THREE_CODE_LETTER[ fiat ]);
    });
  });
  it( 'has a getAPIUrl method', () => {
    expect( getAPIUrl )
      .not.eq( undefined );
  });
  it( 'getAPIUrl returns the api url and the query', () => {
    expect( getAPIUrl( 'ETH?345' ))
      .to.include.string( API_URL )
      .and.not.include.string( 'BTC' );
  });
  it( 'has a calculateProfitLost method', () => {
    expect( calculateProfitLost )
      .not.eq( undefined );
  });
  it( 'calculateProfitLost returns the value between invested and the current value', () => {
    const {
      currentValue,
      invested_1,
      invested_2
    } = mockData.utils;
    expect( calculateProfitLost( invested_1, currentValue ))
      .to.eq( '-2000.00000' );
    expect( calculateProfitLost( invested_2, currentValue ))
      .to.eq( '1000.00000' );
  });
  it( 'has a getInputFieldValues method', () => {
    expect( getInputFieldValues )
      .not.eq( undefined );
  });
  it( 'getInputFieldValues, returns the validated values from inputs', () => {
    expect( getInputFieldValues( mockData.utils.inputs ))
      .to.eql( mockData.utils.inputValues );
  });
  it( 'has a hasRequiredField method', () => {
    expect( hasRequiredField )
      .not.eq( undefined );
  });
  it( 'hasRequiredField returns true if object contains a required property', () => {
    expect( hasRequiredField( mockData.utils.formData[ 0 ]))
      .to.eq( false );
    expect( hasRequiredField( mockData.utils.formData[ 1 ]))
      .to.eq( true );
  });
  it( 'has a fetchConfig method', () => {
    expect( fetchConfig )
      .not.eq( undefined );
  });
  it( 'fetchConfig returns an object with "method", "headers" and "body" properties', () => {
    const data = fetchConfig( 'post', []);
    expect( data )
      .to.have.property( 'method' );
    expect( data )
      .to.have.property( 'headers' );
    expect( data )
      .to.have.property( 'body' );
  });
  it( 'has a isTradeProfitable method', () => {
    expect( isTradeProfitable )
      .not.eq( undefined );
  });
  it( 'isTradeProfitable, returns true if the trade has positive balance', () => {
    expect( isTradeProfitable( 89 ))
      .to.eq( true );
    expect( isTradeProfitable( -89 ))
      .to.eq( false );
  });
  it( 'has a getValueWithFiatSign method', () => {
    expect( getValueWithFiatSign )
      .not.eq( undefined );
  });
  it( 'getValueWithFiatSign, returns a interpolated number with fiat sign', () => {
    expect( getValueWithFiatSign( 'dollar', 90 ))
      .to.eq( '$90' );
    expect( getValueWithFiatSign( 'pound', -89 ))
      .to.eq( '£-89' );
  });
});
