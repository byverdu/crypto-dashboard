import * as actionsType from '../constants';

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

export {
  deleteApiItemRequest,
  deleteApiItemSuccess,
  deleteApiItemFailed
};
