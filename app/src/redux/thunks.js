import axios from 'axios';
import {
  apiDataFetched,
  apiDataFetchFailed
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

const j = [];

export {
  fetchApiData,
  j
};
