import {
  API_DATA_FETCHED,
  API_DATA_FETCH_FAILED,
  ITEM_ADDED_TO_API,
  ITEM_ADDED_TO_API_FAILED
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

function itemAddedToApi( status, data ) {
  return {
    type: ITEM_ADDED_TO_API,
    status,
    data
  };
}

function itemAddedToApiFailed( status, message ) {
  return {
    type: ITEM_ADDED_TO_API_FAILED,
    status,
    message
  };
}

export {
  apiDataFetched,
  apiDataFetchFailed,
  itemAddedToApi,
  itemAddedToApiFailed
};
