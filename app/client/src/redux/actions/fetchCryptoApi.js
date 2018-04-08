import * as actionsType from '../constants';

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

export {
  fetchCryptocompareApiRequest,
  fetchCryptocompareApiSuccess,
  fetchCryptocompareApiFailed
};
