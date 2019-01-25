/* global describe, it */

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import TileHeader from '../../components/Tile/TileHeader';
import TileBody from '../../components/Tile/TileBody';
import TileFooter from '../../components/Tile/TileFooter';
import {
  getTileHeaderProps,
  getTileBodyProps,
  getTileFooterProps
} from '../../components/Tile/tileUtils';
import mockData from '../mockData';

const tileData = mockData.reducers[ 0 ];

describe( '<TileHeader />', () => {
  const headerProps = getTileHeaderProps( tileData );
  const headerWrapper = mount( <TileHeader {...headerProps} /> );
  it( 'should be defined', () => {
    expect( headerWrapper ).not.eq( undefined );
  });
  it( 'should render a CardHeader Component', () => {
    expect( headerWrapper.find( 'CardHeader' )).to.have.length( 1 );
  });
  it( 'CardHeader Component should render name of asset', () => {
    expect( headerWrapper.find( 'CardHeader' ).text()).to.contain( 'btc' );
  });
  xit( 'should render a Button Component', () => {
    expect( headerWrapper.find( 'Button' )).to.have.length( 2 );
  });
});

describe( '<TileBody />', () => {
  const bodyProps = getTileBodyProps( tileData );
  const bodyWrapper = mount( <TileBody {...bodyProps} /> );
  it( 'should be defined', () => {
    expect( bodyWrapper ).not.eq( undefined );
  });
  it( 'should render a CardTitle Component', () => {
    expect( bodyWrapper.find( 'CardTitle' )).to.have.length( 1 );
  });
  it( 'CardTitle Component should render name of asset', () => {
    expect( bodyWrapper.find( 'CardTitle' ).text()).to.eq( 'Position Details' );
  });
  it( 'should render a ListGroupItem Component for the date', () => {
    expect( bodyWrapper.find( 'ListGroupItem' ).first().text()).to.eq( 'Trade date: 2018-02-11 at Cexio' );
  });
  it( 'should render a ListGroupItem Component for the info', () => {
    expect( bodyWrapper.find( 'ListGroupItem' ).last().text()).to.eq( 'Bought 0.05 btc @ $0.0004 = $0.00002000' );
  });
});

describe( '<TileFooter />', () => {
  const footerProps = getTileFooterProps( tileData, { actualPrice: 89 });
  const footerWrapper = mount( <TileFooter {...footerProps} /> );
  const footerWrapperLost = mount(
    <TileFooter {...getTileFooterProps( tileData, { actualPrice: 0.0001 })} />
  );

  it( 'should be defined', () => {
    expect( footerWrapper ).not.eq( undefined );
  });
  it( 'should render a CardFooter Component', () => {
    expect( footerWrapper.find( 'CardFooter' )).to.have.length( 1 );
  });
  it( 'CardFooter Component should render actual value for trade', () => {
    expect( footerWrapper.find( 'CardFooter' ).text()).to.contain( 'Trading @ $89 x 0.05 = 4.45000' );
  });
  it( 'CardFooter Component should has success class for a positive value', () => {
    expect( footerWrapper.find( 'div > div' ).hasClass( 'bg-success' )).to.eq( true );
  });
  it( 'CardFooter Component should has danger class for a negative value', () => {
    expect( footerWrapperLost.find( 'div > div' ).hasClass( 'bg-danger' )).to.eq( true );
  });
});
