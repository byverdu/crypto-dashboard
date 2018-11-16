/* global describe, it, beforeEach */

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import App from '../../containers/App';

let wrapper;

beforeEach(() => {
  wrapper = mount( <App /> );
});

xdescribe( '<App />', () => {
  it( 'should be defined', () => {
    expect( wrapper ).not.eq( undefined );
  });
  it( 'should render a Button Component', () => {
    expect( wrapper.find( 'Button' )).to.have.length( 1 );
  });
  it( 'should render a CryptoForm Component', () => {
    expect( wrapper.find( 'CryptoForm' )).to.have.length( 1 );
  });
  it( 'should render a TileSection Component', () => {
    expect( wrapper.find( 'TileSection' )).to.have.length( 1 );
  });

  it( 'has a handleShowHide method', () => {
    expect( wrapper.instance()).to.have.property( 'handleShowHide' );
  });
});
