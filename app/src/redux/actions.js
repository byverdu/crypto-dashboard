import axios from 'axios';
import {
  DATA_FETCHED
} from './constants';

function dataFetched( fetched, data ) {
  return {
    type: DATA_FETCHED,
    fetched,
    data
  };
}

const fetchCryptoTrades = ( url ) => {
  let isDataFetched;

  return function ( dispatch ) {
    return axios.get( url )
      .then(( resp ) => {
        isDataFetched = true;
        dispatch( dataFetched( isDataFetched, resp.data ));
      })
      .catch(( error ) => {
        isDataFetched = false;
        dispatch( dataFetched( isDataFetched, error ));
      });
  };
};

export {
  dataFetched,
  fetchCryptoTrades
};
