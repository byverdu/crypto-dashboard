const createCryptoEntry = ( bodyPost ) => {
  const {
    dateCrypto, nameCrypto, fiatCrypto, priceCrypto, amountCrypto
  } = bodyPost;

  console.log( bodyPost );

  return {
    nameCrypto,
    amountCrypto,
    priceCrypto,
    fiatCrypto,
    dateCrypto
  };
};

const createNewData = ( response, reqBody ) => {
  const parsedResp = JSON.parse( response );
  const newItem = createCryptoEntry( reqBody );

  return JSON.stringify([...parsedResp, newItem], null, 4 );
};

export default createNewData;
