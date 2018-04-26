import * as actionsType from '../constants';

function fetchExchangesNameRequest( ) {
  return {
    type: actionsType.FETCH_EXCHANGES_REQUEST
  };
}

function fetchExchangesNameSuccess( status, data ) {
  return {
    type: actionsType.FETCH_EXCHANGES_SUCCESS,
    status,
    data
  };
}

function fetchExchangesNameFailed( status, message ) {
  return {
    type: actionsType.FETCH_EXCHANGES_FAILED,
    status,
    message
  };
}

export {
  fetchExchangesNameRequest,
  fetchExchangesNameSuccess,
  fetchExchangesNameFailed
};
