const createCryptoEntry = ( bodyPost ) => {
  const tempKeys = {};
  Object.keys( bodyPost )
    .forEach(( key ) => { tempKeys[ key ] = bodyPost[ key ]; });

  return tempKeys;
};

export const createNewData = ( response, reqBody ) => {
  const parsedResp = JSON.parse( response );
  const newItem = createCryptoEntry( reqBody );

  return JSON.stringify([...parsedResp, newItem], null, 4 );
};

export const deleteItem = ( response, reqBody ) => {
  const parsedResp = JSON.parse( response );
  const itemToDelete = reqBody.cryptoToRemove;
  parsedResp.splice( itemToDelete, 1 );

  return JSON.stringify( parsedResp, null, 4 );
};

export const editItem = ( response, reqBody ) => {
  const parsedResp = JSON.parse( response );
  parsedResp[ reqBody.cryptoToRemove ] = reqBody.data;

  return JSON.stringify( parsedResp, null, 4 );
};
