import axios from 'axios'; // eslint-disable-line
import 'whatwg-fetch';

import {
  fetchApiDataRequest,
  fetchApiDataSuccess,
  fetchApiDataFailed,
  addItemToApiRequest,
  addItemToApiSuccess,
  addItemToApiFailed,
  deleteApiItemRequest,
  deleteApiItemSuccess,
  deleteApiItemFailed
} from './actions';

function fetchApiData( url ) {
  return async ( dispatch ) => {
    dispatch( fetchApiDataRequest());

    try {
      const response = await fetch( url );
      if ( !response.ok ) {
        dispatch( fetchApiDataFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( fetchApiDataSuccess( response.status, body ));
    } catch ( error ) {
      throw new Error( 'Fetch api data failed' );
    }
  };
}

function addItemToApi( url, data ) {
  const axiosConfig = {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( data )
  };
  return async function ( dispatch ) {
    dispatch( addItemToApiRequest());
    try {
      const response = await fetch( url, axiosConfig );
      if ( !response.ok ) {
        dispatch( addItemToApiFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      dispatch( addItemToApiSuccess( response.status, data ));
    } catch ( error ) {
      throw new Error( 'Add api item failed' );
    }
  };
}

function deleteItemFromApi( url, position ) {
  const axiosConfig = {
    method: 'post',
    url,
    position
  };
  return async function ( dispatch ) {
    dispatch( deleteApiItemRequest());
    try {
      const response = await fetch( axiosConfig );
      if ( !response.ok ) {
        dispatch( deleteApiItemFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( deleteApiItemSuccess( response.status, body ));
    } catch ( error ) {
      throw new Error( 'Delete api item failed' );
    }
  };
}

export {
  fetchApiData,
  addItemToApi,
  deleteItemFromApi
};
