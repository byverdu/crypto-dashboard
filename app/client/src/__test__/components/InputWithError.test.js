/* global describe, it, beforeEach */

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Info from '../../components/Info';
import InputWithError from '../../components/InputWithError';

let wrapper;

beforeEach(() => {
  wrapper = mount( <InputWithError /> );
});

describe( '<InputWithError />', () => {
  it( 'should be defined', () => {
    expect( wrapper ).not.eq( undefined );
  });
  it( 'should render a FormGroup Component', () => {
    expect( wrapper.find( 'FormGroup' )).to.have.length( 1 );
  });
  it( 'should render a Label Component', () => {
    expect( wrapper.find( 'Label' )).to.have.length( 1 );
  });
  it( 'should render a input tag', () => {
    expect( wrapper.find( 'input' )).to.have.length( 1 );
  });
  it( 'has a renderError method', () => {
    expect( wrapper.instance()).to.have.property( 'renderError' );
  });
  it( 'has a handleValidity method', () => {
    expect( wrapper.instance()).to.have.property( 'handleValidity' );
  });
  it( 'has a handleValidity method', () => {
    Object.assign( wrapper.instance().input, { validity: { valid: '' } });
    wrapper.setState({ isValid: false });
    expect( wrapper.find( Info )).to.have.length( 1 );
  });
});
