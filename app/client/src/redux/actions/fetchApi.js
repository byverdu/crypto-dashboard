import * as actionsType from '../constants';

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

export {
  fetchApiDataRequest,
  fetchApiDataSuccess,
  fetchApiDataFailed
};
