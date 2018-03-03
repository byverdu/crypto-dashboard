import axios from 'axios';
import {
  FETCH_DATA_API,
  ADD_ITEM_TO_API
} from './constants';

function fetchApiData( fetched, data ) {
  return {
    type: FETCH_DATA_API,
    fetched,
    data
  };
}

function addItemToApi( data ) {
  return {
    type: ADD_ITEM_TO_API,
    data
  };
}

const fetchCryptoTrades = ( url ) => {
  let isDataFetched;

  return function ( dispatch ) {
    return axios.get( url )
      .then(( resp ) => {
        isDataFetched = true;
        dispatch( fetchApiData( isDataFetched, resp.data ));
      })
      .catch(( error ) => {
        isDataFetched = false;
        dispatch( fetchApiData( isDataFetched, error ));
      });
  };
};

export {
  fetchApiData,
  addItemToApi,
  fetchCryptoTrades
};
