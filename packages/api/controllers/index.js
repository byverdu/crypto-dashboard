import { CRYPTOFILE_PATH } from '../config';

const { promisify } = require( 'util' );
const fs = require( 'fs' );

const readFileAsync = promisify( fs.readFile );

module.exports = {
  getAPI: require( './getAPI' )( readFileAsync, CRYPTOFILE_PATH ),
  postAPI: require( './postAPI' )( readFileAsync, CRYPTOFILE_PATH ),
  deleteAPI: require( './deleteAPI' )( readFileAsync, CRYPTOFILE_PATH ),
  putAPI: require( './putAPI' )( readFileAsync, CRYPTOFILE_PATH )
};
