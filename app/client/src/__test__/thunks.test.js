/* global describe, it, beforeEach */

import { expect } from 'chai';
import configureStore from 'redux-mock-store'; //eslint-disable-line
import thunk from 'redux-thunk';
import { fetchApiData } from '../redux/thunks';
import mockData from './mockData';

const middlewares = [thunk];
const mockStore = configureStore( middlewares );
const store = mockStore({
  status: 0,
  data: mockData.reducers
});

beforeEach(() => {
  fetch.resetMocks();
  store.clearActions();
});

describe( 'fetchApiData', () => {
  it( 'is defined', () => {
    expect( fetchApiData ).not.eq( undefined );
  });
  it( 'calls request and success actions if the fetch response was successful', async () => {
    fetch.mockResponse( JSON.stringify([]));
    await store.dispatch( fetchApiData( 'api/crypto' ));

    expect( store.getActions())
      .to.eql( mockData.successFetch );
  });
  it( 'calls request and failed actions if the fetch response was successful', async () => {
    fetch.mockResponse( 'failed', mockData.failFetchResponse );
    await store.dispatch( fetchApiData( 'api/cryptouj' ));

    expect( store.getActions())
      .to.eql( mockData.failFetch );
  });
});
