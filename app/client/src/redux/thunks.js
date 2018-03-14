import axios from 'axios'; // eslint-disable-line
import {
  fetchApiDataRequest,
  fetchApiDataSuccess,
  fetchApiDataFailed,
  addItemToApiRequest,
  addItemToApiSuccess,
  addItemToApiFailed
  // deleteApiItemRequest,
  // deleteApiItemSuccess,
  // deleteApiItemFailed
} from './actions';

function fetchApiData( url ) {
  return function ( dispatch ) {
    dispatch( fetchApiDataRequest());
    return axios.get( url ).then(
      resp => dispatch( fetchApiDataSuccess( resp.status, resp.data )),
      error => dispatch( fetchApiDataFailed( error.response.status, error.message ))
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
    dispatch( addItemToApiRequest());
    return axios( axiosConfig ).then(
      resp => dispatch( addItemToApiSuccess( resp.status, resp.data )),
      error => dispatch( addItemToApiFailed( error.response.status, error.message ))
    );
  };
}

export {
  fetchApiData,
  addItemToApi
};
