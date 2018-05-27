import * as actionsType from '../constants';

function fetchCryptocompareApiRequest( ) {
  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_API_REQUEST
  };
}

function fetchCryptocompareHistoricalApiSuccess( status, response ) {
  const tempValues = Object.values( response )[ 0 ];
  const priceHistorical = Object.values( tempValues ).pop();

  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_HISTORICAL_API_SUCCESS,
    status,
    priceHistorical
  };
}

function fetchCryptocompareMultiApiSuccess( status, response ) {
  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_MULTI_API_SUCCESS,
    status,
    priceMulti: response
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
  fetchCryptocompareHistoricalApiSuccess,
  fetchCryptocompareMultiApiSuccess,
  fetchCryptocompareApiFailed
};
