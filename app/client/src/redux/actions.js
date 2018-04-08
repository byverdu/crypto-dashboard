import * as actionsType from './constants';

function fetchApiDataRequest( ) {
  return {
    type: actionsType.FETCH_API_DATA_REQUEST
  };
}

function fetchApiDataSuccess( status, data ) {
  return {
    type: actionsType.FETCH_API_DATA_SUCCESS,
    status,
    data
  };
}

function fetchApiDataFailed( status, message ) {
  return {
    type: actionsType.FETCH_API_DATA_FAILED,
    status,
    message
  };
}

function addItemToApiRequest( ) {
  return {
    type: actionsType.ADD_ITEM_TO_API_REQUEST
  };
}

function addItemToApiSuccess( status, data ) {
  return {
    type: actionsType.ADD_ITEM_TO_API_SUCCESS,
    status,
    data
  };
}

function addItemToApiFailed( status, message ) {
  return {
    type: actionsType.ADD_ITEM_TO_API_FAILED,
    status,
    message
  };
}

function deleteApiItemRequest( ) {
  return {
    type: actionsType.DELETE_API_ITEM_REQUEST
  };
}

function deleteApiItemSuccess( status, data ) {
  return {
    type: actionsType.DELETE_API_ITEM_SUCCESS,
    status,
    data
  };
}

function deleteApiItemFailed( status, message ) {
  return {
    type: actionsType.DELETE_API_ITEM_FAILED,
    status,
    message
  };
}

function fetchCryptocompareApiRequest( ) {
  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_API_REQUEST
  };
}

function fetchCryptocompareApiSuccess( status, priceValue ) {
  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_API_SUCCESS,
    status,
    priceValue
  };
}

function fetchCryptocompareApiFailed( status, message ) {
  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_API_FAILED,
    status,
    message
  };
}

function editApiItemRequest( ) {
  return {
    type: actionsType.EDIT_API_ITEM_REQUEST
  };
}

function editApiItemSuccess( status, data ) {
  return {
    type: actionsType.EDIT_API_ITEM_SUCCESS,
    status,
    data
  };
}

function editApiItemFailed( status, message ) {
  return {
    type: actionsType.EDIT_API_ITEM_FAILED,
    status,
    message
  };
}

export {
  fetchApiDataRequest,
  fetchApiDataSuccess,
  fetchApiDataFailed,
  addItemToApiRequest,
  addItemToApiSuccess,
  addItemToApiFailed,
  deleteApiItemRequest,
  deleteApiItemSuccess,
  deleteApiItemFailed,
  fetchCryptocompareApiRequest,
  fetchCryptocompareApiSuccess,
  fetchCryptocompareApiFailed,
  editApiItemRequest,
  editApiItemSuccess,
  editApiItemFailed
};
