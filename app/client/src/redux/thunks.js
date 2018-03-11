import axios from 'axios';
import {
  apiDataFetched,
  apiDataFetchFailed,
  itemAddedToApi,
  itemAddedToApiFailed
} from './actions';

function fetchApiData( url ) {
  return function ( dispatch ) {
    return axios.get( url ).then(
      resp => dispatch( apiDataFetched( resp.status, resp.data )),
      error => dispatch( apiDataFetchFailed( error.response.status, error.message ))
    );
  };
}

function addItemToApi( url, data ) {
  const axiosConfig = {
    method: 'post',
    url,
    data
  };
  return function ( dispatch ) {
    return axios( axiosConfig ).then(
      resp => dispatch( itemAddedToApi( resp.status, resp.data )),
      error => dispatch( itemAddedToApiFailed( error.response.status, error.message ))
    );
  };
}

export {
  fetchApiData,
  addItemToApi
};
