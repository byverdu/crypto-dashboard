/* global describe, it */
import { expect } from 'chai';
import mockData from '../mockData';
import {
  getTileHeaderProps,
  getTileBodyProps,
  getTileFooterProps
} from '../../components/Tile/tileUtils';

describe( 'Utils for Tile component', () => {
  it( 'has a getTileHeaderProps method', () => {
    expect( getTileHeaderProps ).not.eq( undefined );
  });
  it( 'getTileHeaderProps returns and object with name and onClickRemoveItem properites', () => {
    const result = getTileHeaderProps({ nameCrypto: 'Albert' }, () => {});
    expect( getTileHeaderProps( result )).to.have.property( 'name' );
    expect( getTileHeaderProps( result )).to.have.property( 'onClickRemoveItem' );
  });
  it( 'has a getTileBodyProps method', () => {
    expect( getTileBodyProps ).not.eq( undefined );
  });
  it( 'getTileBodyProps returns and object with properites for body', () => {
    const result = getTileBodyProps( mockData.reducers[ 0 ]);
    expect( result ).to.have.property( 'date' );
    expect( result ).to.have.property( 'name' );
    expect( result ).to.have.property( 'price' );
    expect( result ).to.have.property( 'amount' );
    expect( result ).to.have.property( 'tradeValue' );
  });
  it( 'has a getTileFooterProps method', () => {
    expect( getTileFooterProps ).not.eq( undefined );
  });
  it( 'getTileFooterProps returns and object with name and onClickRemoveItem properites', () => {
    const result = getTileFooterProps( mockData.reducers[ 0 ], { actualPrice: 90 });
    expect( result ).to.have.property( 'actualPrice' );
    expect( result ).to.have.property( 'profitLost' );
    expect( result ).to.have.property( 'isProfit' );
    expect( result ).to.have.property( 'amount' );
    expect( result ).to.have.property( 'actualValue' );
  });
});
