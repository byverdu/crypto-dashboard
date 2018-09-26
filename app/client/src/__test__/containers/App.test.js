/* global describe, it, beforeEach */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Button } from 'reactstrap';
import App from '../../containers/App';
import TileSection from '../../containers/TileSection';
import CryptoForm from '../../components/CryptoForm';

let wrapper;
const store = {
  getState: () => ({ apiData: [] }),
  dispatch: () => {},
  subscribe: () => {}
};

beforeEach(() => {
  wrapper = shallow( <App /> );
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
