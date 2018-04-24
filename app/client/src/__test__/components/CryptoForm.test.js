/* global describe, it, beforeEach */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Button } from 'reactstrap';
import CryptoForm from '../../components/CryptoForm';
import SelectWrapper from '../../components/SelectWrapper';

const { formData } = require( '../../config/data' );

let wrapper;
let mounted;
let store;

const mockStore = configureStore();
const storeData = {
  api: {
    status: 200,
    data: []
  }
};

beforeEach(() => {
  store = mockStore( storeData );
  wrapper = shallow( <CryptoForm store={store} /> );
  mounted = mount( <Provider store={store}><CryptoForm formData={formData}>
  <SelectWrapper selectData={[]} /></CryptoForm></Provider> );
});

describe( '<CryptoForm />', () => {
  it( 'should be defined', () => {
    expect( wrapper ).not.eq( undefined );
  });
  it( 'should render a Button Component', () => {
    expect( mounted.find( Button )).to.have.length( 1 );
  });
  it( 'should render a form tag', () => {
    expect( mounted.find( 'form' )).to.have.length( 1 );
  });
  it( 'should render a input tag', () => {
    expect( mounted.find( 'input' )).to.have.length( 8 );
  });
});
