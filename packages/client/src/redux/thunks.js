import 'whatwg-fetch';

import * as actions from './actions';
import { fetchConfig } from '../clientUtils';

function fetchApiData( url ) {
  return async ( dispatch ) => {
    dispatch( actions.fetchApiDataRequest());

    try {
      const response = await fetch( url );
      if ( !response.ok ) {
        dispatch( actions.fetchApiDataFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( actions.updateTotalInvested( {body, type: 'get'} ));
      dispatch( actions.fetchApiDataSuccess( response.status, body ));
    } catch ( error ) {
      const message = `Fetch api data failed: ${error}`;
      throw new Error( message );
    }
  };
}

function addItemToApi( url, data ) {
  const config = fetchConfig( 'post', data );

  return async function ( dispatch ) {
    dispatch( actions.addItemToApiRequest());
    try {
      const response = await fetch( url, config );
      if ( !response.ok ) {
        dispatch( actions.addItemToApiFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( actions.addItemToApiSuccess( response.status, body ));
      dispatch( actions.updateTotalInvested( {body, type: 'add'} ));
      dispatch( actions.formSubmitted( false ));
    } catch ( error ) {
      throw new Error( 'Add api item failed' );
    }
  };
}

function deleteItemFromApi( url, data ) {
  const { cryptoToRemove } = data;
  const config = fetchConfig( 'delete', { cryptoToRemove });

  return async function ( dispatch ) {
    dispatch( actions.deleteApiItemRequest());

    try {
      const response = await fetch( url, config );
      if ( !response.ok ) {
        dispatch( actions.deleteApiItemFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( actions.updateTotalInvested( {body, type: 'delete'} ));
      dispatch(actions.updateTotalProfitLost())
      dispatch( actions.deleteApiItemSuccess( response.status, body ));
    } catch ( error ) {
      throw new Error( 'Delete api item failed' );
    }
  };
}

function fetchCryptocompareApi( url ) {
  const config = fetchConfig( 'get' );

  return async function ( dispatch ) {
    dispatch( actions.fetchCryptocompareApiRequest());

    try {
      const response = await fetch( url, config );
      if ( !response.ok ) {
        dispatch( actions.fetchCryptocompareApiFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }

      return response.json();
    } catch ( error ) {
      throw new Error( 'Fetch cryptocompare api failed' );
    }
  };
}

// function fetchCryptocompareApi( url, endPoint ) {
//   const config = fetchConfig( 'get' );

//   return async function ( dispatch ) {
//     dispatch( actions.fetchCryptocompareApiRequest());

//     try {
//       const response = await fetch( url, config );
//       if ( !response.ok ) {
//         dispatch( actions.fetchCryptocompareApiFailed(
//           response.status,
//           `${response.url} ${response.statusText}`
//         ));
//         return;
//       }

//       const body = await response.json();

//       switch ( endPoint ) {
//         case 'historical':
//           dispatch( actions.fetchCryptocompareHistoricalApiSuccess(
//             response.status, body
//           ));
//           break;

//         case 'multi':
//           dispatch( actions.fetchCryptocompareMultiApiSuccess(
//             response.status, body
//           ));
//           break;

//         default:
//           break;
//       }
//     } catch ( error ) {
//       throw new Error( 'Fetch cryptocompare api failed' );
//     }
//   };
// }

function editItemFromApi( url, data ) {
  const config = fetchConfig( 'put', data );

  return async function ( dispatch ) {
    dispatch( actions.editApiItemRequest());

    try {
      const response = await fetch( url, config );
      if ( !response.ok ) {
        dispatch( actions.editApiItemFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }
      const body = await response.json();
      dispatch( actions.editApiItemSuccess( response.status, body ));
    } catch ( error ) {
      throw new Error( 'Edit api item failed' );
    }
  };
}

function fetchAllExchangesNames( url ) {
  return async function ( dispatch ) {
    dispatch( actions.fetchExchangesNameRequest());

    try {
      const response = await fetch( url );

      if ( !response.ok ) {
        dispatch( actions.fetchExchangesNameFailed(
          response.status,
          `${response.url} ${response.statusText}`
        ));
        return;
      }

      const body = await response.json();
      if ( !body.Response ) {
        dispatch( actions.fetchExchangesNameSuccess(
          response.status, body
        ));
      } else {
        dispatch( actions.fetchExchangesNameFailed(
          500,
          `${response.url} ${body.Response}`
        ));
      }
    } catch ( e ) {
      throw new Error( 'Fetch exchanges names failed' );
    }
  };
}

export {
  fetchApiData,
  addItemToApi,
  deleteItemFromApi,
  fetchCryptocompareApi,
  editItemFromApi,
  fetchAllExchangesNames
};
