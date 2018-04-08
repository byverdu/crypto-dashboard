import * as actionsType from '../constants';

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
  editApiItemRequest,
  editApiItemSuccess,
  editApiItemFailed
};
