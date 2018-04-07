import {
  CLIENT_PATH, CRYPTOFILE_PATH
} from '../../config/server';

const { promisify } = require( 'util' );
const fs = require( 'fs' );

const readFileAsync = promisify( fs.readFile );

module.exports = {
  getHome: require( './getHome' )( CLIENT_PATH ),
  getAPI: require( './getAPI' )( readFileAsync, CRYPTOFILE_PATH ),
  postAPI: require( './postAPI' )( readFileAsync, CRYPTOFILE_PATH ),
  deleteAPI: require( './deleteAPI' )( readFileAsync, CRYPTOFILE_PATH ),
  putAPI: require( './putAPI' )( readFileAsync, CRYPTOFILE_PATH )
};
