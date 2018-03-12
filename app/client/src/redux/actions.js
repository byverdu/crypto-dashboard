import {
  FETCH_API_DATA_REQUEST,
  FETCH_API_DATA_SUCCESS,
  FETCH_API_DATA_FAILED,
  ADD_ITEM_TO_API_REQUEST,
  ADD_ITEM_TO_API_SUCCESS,
  ADD_ITEM_TO_API_FAILED,
  DELETE_API_ITEM_REQUEST
} from './constants';

function fetchApiDataRequest( ) {
  return {
    type: FETCH_API_DATA_REQUEST
  };
}

function fetchApiDataSuccess( status, data ) {
  return {
    type: FETCH_API_DATA_SUCCESS,
    status,
    data
  };
}

function fetchApiDataFailed( status, message ) {
  return {
    type: FETCH_API_DATA_FAILED,
    status,
    message
  };
}

function addItemToApiRequest( ) {
  return {
    type: ADD_ITEM_TO_API_REQUEST
  };
}

function addItemToApiSuccess( status, data ) {
  return {
    type: ADD_ITEM_TO_API_SUCCESS,
    status,
    data
  };
}

function addItemToApiFailed( status, message ) {
  return {
    type: ADD_ITEM_TO_API_FAILED,
    status,
    message
  };
}

function deleteApiItemRequest( ) {
  return {
    type: DELETE_API_ITEM_REQUEST
  };
}

export {
  fetchApiDataRequest,
  fetchApiDataSuccess,
  fetchApiDataFailed,
  addItemToApiRequest,
  addItemToApiSuccess,
  addItemToApiFailed,
  deleteApiItemRequest
};
