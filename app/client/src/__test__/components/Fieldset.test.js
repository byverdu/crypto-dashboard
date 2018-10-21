/* global describe, xit, it, beforeEach */

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Fieldset } from '../../components/';

const { formData } = require( '../../config/data' );

let wrapper;

beforeEach(() => {
  wrapper = mount( <Fieldset {...formData}/> );
});

describe( '<Fieldset />', () => {
  it( 'should be defined', () => {
    expect( wrapper ).not.eq( undefined );
  });
  xit( 'should render input tags', () => {
    expect( wrapper.find( 'input' )).to.have.length( 7 );
  });
  xit( 'should render legend tags', () => {
    expect( wrapper.find( 'legend' )).to.have.length( 1 );
  });
});
