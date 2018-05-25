import * as actionsType from '../constants';

function fetchCryptocompareApiRequest( ) {
  return {
    type: actionsType.FETCH_CRYPTOCOMPARE_API_REQUEST
  };
}

function fetchCryptocompareApiSuccess(
  status, priceValue, endPoint, tradeProps = {}
) {
  let tradeValue;
  switch ( endPoint ) {
    case 'historical': {
      const tempValues = Object.values( priceValue )[ 0 ];
      tradeValue = Object.values( tempValues ).pop();
      break;
    }

    case 'multi': {
      const { coinCrypto, pairCrypto } = tradeProps;
      tradeValue = priceValue[ coinCrypto ][ pairCrypto ];
      break;
    }

    default:
      break;
  }

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
