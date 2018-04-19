import * as actionsType from '../constants';

function fetchCryptocompareApiRequest( ) {
  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_API_REQUEST
  };
}

function fetchCryptocompareApiSuccess( status, priceValue ) {
  const tempValues = Object.values( priceValue )[ 0 ];
  const tradeValue = Object.values( tempValues ).pop();
  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_API_SUCCESS,
    status,
    priceValue: tradeValue
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
