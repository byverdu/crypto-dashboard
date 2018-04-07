import 'whatwg-fetch';

import * as actions from './actions';
import { fetchConfig } from '../clientUtils';

function fetchApiData( url ) {
  return async ( dispatch ) => {
    dispatch( actions.fetchApiDataRequest());

    try {
      const response = await fetch( url );
      if ( !response.ok ) {
        dispatch( actions.fetchApiDataFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( actions.fetchApiDataSuccess( response.status, body ));
    } catch ( error ) {
      throw new Error( 'Fetch api data failed' );
    }
  };
}

function addItemToApi( url, data ) {
  const config = fetchConfig( 'post', data );

  return async function ( dispatch ) {
    dispatch( actions.addItemToApiRequest());
    try {
      const response = await fetch( url, config );
      if ( !response.ok ) {
        dispatch( actions.addItemToApiFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( actions.addItemToApiSuccess( response.status, body ));
    } catch ( error ) {
      throw new Error( 'Add api item failed' );
    }
  };
}

function deleteItemFromApi( url, data ) {
  const config = fetchConfig( 'delete', data );

  return async function ( dispatch ) {
    dispatch( actions.deleteApiItemRequest());

    try {
      const response = await fetch( url, config );
      if ( !response.ok ) {
        dispatch( actions.deleteApiItemFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( actions.deleteApiItemSuccess( response.status, body ));
    } catch ( error ) {
      throw new Error( 'Delete api item failed' );
    }
  };
}

function fetchCryptocompareApi( url ) {
  const config = fetchConfig( 'get' );

  return async function ( dispatch ) {
    dispatch( actions.fetchCryptocompareApiRequest());

    try {
      const response = await fetch( url, config );
      if ( !response.ok ) {
        dispatch( actions.fetchCryptocompareApiFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( actions.fetchCryptocompareApiSuccess( response.status, body ));
    } catch ( error ) {
      throw new Error( 'Delete api item failed' );
    }
  };
}

export {
  fetchApiData,
  addItemToApi,
  deleteItemFromApi,
  fetchCryptocompareApi
};
