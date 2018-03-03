import axios from 'axios';
import {
  API_DATA_FETCHED,
  API_DATA_FETCH_FAILED,
  ADD_ITEM_TO_API
} from './constants';

function apiDataFetched( status, data ) {
  return {
    type: API_DATA_FETCHED,
    status,
    data
  };
}

function apiDataFetchFailed( status, message ) {
  return {
    type: API_DATA_FETCH_FAILED,
    status,
    message
  };
}

function addItemToApi( data ) {
  return {
    type: ADD_ITEM_TO_API,
    data
  };
}

// Thunk functions

const fetchApiData = ( url ) => {
  let isDataFetched;

  return function ( dispatch ) {
    return axios.get( url )
      .then(( resp ) => {
        isDataFetched = true;
        dispatch( apiDataFetched( isDataFetched, resp.data ));
      })
      .catch(( error ) => {
        isDataFetched = false;
        dispatch( apiDataFetched( isDataFetched, error.message ));
      });
  };
};

export {
  apiDataFetched,
  apiDataFetchFailed,
  addItemToApi,
  fetchApiData
};
