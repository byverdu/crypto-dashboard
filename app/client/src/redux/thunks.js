import axios from 'axios'; // eslint-disable-line
import 'whatwg-fetch';

import {
  fetchApiDataRequest,
  fetchApiDataSuccess,
  fetchApiDataFailed,
  addItemToApiRequest,
  addItemToApiSuccess,
  addItemToApiFailed
  // deleteApiItemRequest,
  // deleteApiItemSuccess,
  // deleteApiItemFailed
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
    url,
    data
  };
  return function ( dispatch ) {
    dispatch( addItemToApiRequest());
    return axios( axiosConfig ).then(
      resp => dispatch( addItemToApiSuccess( resp.status, resp.data )),
      error => dispatch( addItemToApiFailed( error.response.status, error.message ))
    );
  };
}

export {
  fetchApiData,
  addItemToApi
};
