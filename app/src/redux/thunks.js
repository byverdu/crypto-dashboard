import axios from 'axios';
import {
  apiDataFetched,
  apiDataFetchFailed,
  itemAddedToApi
} from './actions';

const fetchApiData = url =>
  dispatch =>
    axios.get( url )
      .then( resp => dispatch(
        apiDataFetched(
          resp.status, resp.data
        )
      ))
      .catch( error => dispatch(
        apiDataFetchFailed(
          error.response.status, error.message
        )
      ));

const addItemToApi = url =>
  dispatch =>
    axios.get( url )
      .then( resp => dispatch(
        itemAddedToApi(
          resp.status, resp.data
        )
      ))
      .catch( error => dispatch(
        apiDataFetchFailed(
          error.response.status, error.message
        )
      ));

export {
  fetchApiData,
  addItemToApi
};
