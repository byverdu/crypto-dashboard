/* global describe, it */
import { expect } from 'chai';
import {
  FIAT_SIGN, FIAT_THREE_CODE_LETTER, API_URL
} from '../config/client';
import {
  calculateTradingValue,
  getFiatSign,
  getFiatCodeLetter,
  getAPIUrl,
  calculateProfitLost,
  getInputFieldValues
} from '../clientUtils';
import mockData from './mockData';

describe( 'Utils methods', () => {
  it( 'has a calculateTradingValue method', () => {
    expect( calculateTradingValue )
      .not.eq( undefined );
  });
  it( 'calculateTradingValue multiplies amount and price and returns 3 decimal digits', () => {
    const { amount, price_1 } = mockData.utils;
    expect( calculateTradingValue( amount, price_1 ))
      .to.be.a( 'string' )
      .and.eq( '22.500' );
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
      .to.eq( '-2000.000' );
    expect( calculateProfitLost( invested_2, currentValue ))
      .to.eq( '1000.000' );
  });
  it( 'has a getInputFieldValues method', () => {
    expect( getInputFieldValues )
      .not.eq( undefined );
  });
  it( 'getInputFieldValues, returns the validated values from inputs', () => {
    expect( getInputFieldValues( mockData.utils.inputs ))
      .to.eql( mockData.utils.inputValues );
  });
});
