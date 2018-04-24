/* global describe, it, beforeEach */

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Button } from 'reactstrap';
import { Form, InputWithError } from '../../components/';

const { formData } = require( '../../config/data' );

let wrapper;

beforeEach(() => {
  wrapper = mount( <Form formData={formData}/> );
});

describe( '<Form />', () => {
  it( 'should be defined', () => {
    expect( wrapper ).not.eq( undefined );
  });
  it( 'should render a Button Component', () => {
    expect( wrapper.find( Button )).to.have.length( 1 );
  });
  it( 'should render a InputWithError Component', () => {
    expect( wrapper.find( InputWithError )).to.have.length( 7 );
  });
  it( 'should render a form tag', () => {
    expect( wrapper.find( 'form' )).to.have.length( 1 );
  });
});
