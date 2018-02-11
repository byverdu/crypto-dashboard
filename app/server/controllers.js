import {
  CLIENT_PATH, PATH_CRYPTOFILE
} from '../config';

const { promisify } = require( 'util' );
const fs = require( 'fs' );

const readFileAsync = promisify( fs.readFile );

function createCryptoEntry( bodyPost ) {
  const date = bodyPost.dateCrypto ?
    bodyPost.dateCrypto :
    new Date();

  return {
    name: bodyPost.nameCrypto,
    amount: bodyPost.amountCrypto,
    price: bodyPost.priceCrypto,
    date
  };
}

function createNewData( response, reqBody ) {
  const parsedResp = JSON.parse( response );
  const newItem = createCryptoEntry( reqBody );

  return JSON.stringify([...parsedResp, newItem], null, 4 );
}

function getIndex( req, res ) {
  res.sendFile(
    'index.html',
    { root: CLIENT_PATH }
  );
}

function postIndex( req, res ) {
  readFileAsync(
    PATH_CRYPTOFILE,
    { encoding: 'utf8' }
  ).then(( response ) => {
    const newData = createNewData( response, req.body );
    fs.writeFile(
      PATH_CRYPTOFILE,
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
}

function getCryptoAPI( req, res ) {
  readFileAsync(
    PATH_CRYPTOFILE,
    { encoding: 'utf8' }
  ).then(( response ) => {
    res.json( JSON.parse( response ));
    console.log( 'readfile API resolved' );
  }).catch(( err ) => {
    throw new Error( `Read JSON error: ${err}` );
  });
}

export {
  getIndex,
  postIndex,
  getCryptoAPI
};
