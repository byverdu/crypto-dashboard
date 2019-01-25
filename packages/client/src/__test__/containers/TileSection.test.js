/* global describe, it, beforeEach */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TileSection from '../../containers/TileSection';

let wrapper;
const store = {
  getState: () => ({ apiData: [] }),
  dispatch: () => {},
  subscribe: () => {}
};
beforeEach(() => {
  wrapper = shallow( <TileSection store={store} /> );
});

describe( '<TileSection />', () => {
  it( 'should be defined', () => {
    expect( wrapper ).not.eq( undefined );
  });
});
