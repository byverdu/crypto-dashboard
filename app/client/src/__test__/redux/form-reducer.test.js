/* global describe, it, beforeEach, afterEach */

import { expect } from 'chai';
import * as actions from '../../redux/constants';
import formReducer from '../../redux/reducers/formReducer';

const initialState = {
  data: [],
  message: '',
  status: 200
};

describe( 'formReducer', () => {
  it( 'is defined', () => {
    expect( formReducer ).not.to.eq( undefined );
  });
  it( 'initial state should be an object', () => {
    expect( formReducer( initialState, {})).to.eql( initialState );
  });
  it( 'should populate the array with the fetched data', () => {
    const data = ['polinex', 'binance'];
    const newItem = {
      type: actions.FETCH_EXCHANGES_SUCCESS,
      data,
      status: 200
    };
    const newState = {
      message: '',
      data,
      status: 200
    };

    expect( formReducer( initialState, newItem )).to.eql( newState );
  });
  it( 'should dispatch error when fetch fails', () => {
    const newItem = {
      type: actions.FETCH_EXCHANGES_FAILED,
      message: 'fetch failed',
      data: [],
      status: 404
    };
    const newState = {
      message: 'fetch failed',
      data: [],
      status: 404
    };

    expect( formReducer( initialState, newItem )).to.eql( newState );
  });
});
