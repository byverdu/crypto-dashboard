/* eslint-disable func-names */
const fs = require( 'fs' );

function createCryptoEntry( bodyPost ) {
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
}

function createNewData( response, reqBody ) {
  const parsedResp = JSON.parse( response );
  const newItem = createCryptoEntry( reqBody );

  return JSON.stringify([...parsedResp, newItem], null, 4 );
}

module.exports = function ( readFileAsync, pathToFile ) {
  return function ( req, res ) {
    readFileAsync(
      pathToFile,
      { encoding: 'utf8' }
    ).then(( response ) => {
      const newData = createNewData( response, req.body );
      fs.writeFile(
        pathToFile,
        newData,
        ( err ) => {
          if ( err ) {
            throw new Error( `Write JSON error: ${err}` );
          }
          console.log( 'writefile resolved' );
          res.redirect( '/' );
        }
      );
      console.log( 'readfile POST resolved' );
    }).catch(( err ) => {
      throw new Error( `Read JSON error: ${err}` );
    });
  };
};
