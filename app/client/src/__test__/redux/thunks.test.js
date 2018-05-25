/* global describe, it, beforeEach */

import { expect } from 'chai';
import configureStore from 'redux-mock-store'; //eslint-disable-line
import thunk from 'redux-thunk';
import {
  fetchApiData,
  addItemToApi,
  deleteItemFromApi,
  fetchCryptocompareApi,
  editItemFromApi,
  fetchAllExchangesNames
} from '../../redux/thunks';
import mockData from '../mockData';

const middlewares = [thunk];
const mockStore = configureStore( middlewares );
const store = mockStore({
  status: 0,
  data: mockData.reducers
});
global.fetch = require( 'jest-fetch-mock' );

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
  it( 'calls request and failed actions if the fetch response was unsuccessful', async () => {
    fetch.mockResponse( 'failed', mockData.failFetchResponse );
    await store.dispatch( fetchApiData( 'api/cryptouj' ));

    expect( store.getActions())
      .to.eql( mockData.failFetch );
  });
});

describe( 'addItemToApi', () => {
  it( 'is defined', () => {
    expect( addItemToApi ).not.eq( undefined );
  });
  it( 'calls request and success actions if the item is saved successfuly', async () => {
    fetch.mockResponse( JSON.stringify([]));
    await store.dispatch( addItemToApi( 'api/crypto', []));

    expect( store.getActions())
      .to.eql( mockData.successAddItem );
  });
  it( 'calls request and failed actions if saving the item fails', async () => {
    fetch.mockResponse( 'failed', mockData.failFetchResponse );
    await store.dispatch( addItemToApi( 'api/cryptouj', []));

    expect( store.getActions())
      .to.eql( mockData.failAddItem );
  });
});

describe( 'deleteItemFromApi', () => {
  it( 'is defined', () => {
    expect( deleteItemFromApi ).not.eq( undefined );
  });
  it( 'calls request and success actions if the item is deleted successfuly', async () => {
    fetch.mockResponse( JSON.stringify([]));
    await store.dispatch( deleteItemFromApi( 'api/crypto', []));

    expect( store.getActions())
      .to.eql( mockData.successDeleteItem );
  });
  it( 'calls request and failed actions if deleting the item fails', async () => {
    fetch.mockResponse( 'failed', mockData.failFetchResponse );
    await store.dispatch( deleteItemFromApi( 'api/crypto', 0 ));

    expect( store.getActions())
      .to.eql( mockData.failDeleteItem );
  });
});

describe( 'fetchCryptocompareApi', () => {
  it( 'is defined', () => {
    expect( fetchCryptocompareApi ).not.eq( undefined );
  });
  it( 'calls request and success actions if the fetch response was successful for "historical" type', async () => {
    fetch.mockResponse( JSON.stringify({
      ETH: {
        USD: 200
      }
    }));
    await store.dispatch( fetchCryptocompareApi( 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD', 'historical' ));

    expect( store.getActions())
      .to.eql( mockData.successFetchApiHistorical );
  });
  it( 'calls request and success actions if the fetch response was successful for "multi" type', async () => {
    fetch.mockResponse( JSON.stringify({
      ETH: {
        USD: 200
      },
      ADA: {
        GBP: 0.1531
      }
    }));

    await store.dispatch( fetchCryptocompareApi(
      'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,ADA&tsyms=USD,GBP',
      'multi',
      { coinCrypto: 'ADA', pairCrypto: 'GBP' }
    ));

    expect( store.getActions())
      .to.eql( mockData.successFetchApiMulti );
  });
  it( 'calls request and failed actions if the fetch response was unsuccessful', async () => {
    fetch.mockResponse( 'failed', mockData.failFetchResponse );
    await store.dispatch( fetchCryptocompareApi( 'https://min-api.cryptocompare.com/data/lololololo?fsym=ETH&tsyms=USD', 'historical' ));

    expect( store.getActions())
      .to.eql( mockData.failFetchApi );
  });
});

describe( 'editItemFromApi', () => {
  it( 'is defined', () => {
    expect( editItemFromApi ).not.eq( undefined );
  });
  it( 'calls request and success actions if the fetch response was successful', async () => {
    fetch.mockResponse( JSON.stringify([mockData.reducers[ 1 ]]));
    await store.dispatch( editItemFromApi( 'api/crypto', mockData.reducers[ 1 ]));

    expect( store.getActions())
      .to.eql( mockData.successEditItem );
  });
  it( 'calls request and failed actions if the fetch response was unsuccessful', async () => {
    fetch.mockResponse( 'failed', mockData.failFetchResponse );
    await store.dispatch( editItemFromApi( 'api/crypto', mockData.reducers[ 0 ]));

    expect( store.getActions())
      .to.eql( mockData.failEditItem );
  });
});

describe( 'fetchAllExchangesNames', () => {
  it( 'is defined', () => {
    expect( fetchAllExchangesNames ).not.eq( undefined );
  });
  it( 'calls request and success actions if the fetch response was successful', async () => {
    fetch.mockResponse( JSON.stringify({ polinex: '', binance: '' }));
    await store.dispatch( fetchAllExchangesNames( 'api/crypto' ));

    expect( store.getActions())
      .to.eql( mockData.successFetchExchanges );
  });
  it( 'calls request and failed actions if the fetch response was unsuccessful', async () => {
    fetch.mockResponse( 'failed', mockData.failFetchResponse );
    await store.dispatch( fetchAllExchangesNames( 'api/crypto' ));

    expect( store.getActions())
      .to.eql( mockData.failFetchExchanges );
  });
});
