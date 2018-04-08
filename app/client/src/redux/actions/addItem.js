import * as actionsType from '../constants';

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

export {
  addItemToApiRequest,
  addItemToApiSuccess,
  addItemToApiFailed
};
