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

export {
  apiDataFetched,
  apiDataFetchFailed,
  addItemToApi
};
