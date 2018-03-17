const createCryptoEntry = ( bodyPost ) => {
  const {
    dateCrypto, nameCrypto, fiatCrypto, priceCrypto, amountCrypto
  } = bodyPost;

  return {
    nameCrypto,
    amountCrypto,
    priceCrypto,
    fiatCrypto,
    dateCrypto
  };
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
