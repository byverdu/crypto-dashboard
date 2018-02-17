import {
  CLIENT_PATH, CRYPTOFILE_PATH
} from '../../config/server';

const { promisify } = require( 'util' );
const fs = require( 'fs' );

const readFileAsync = promisify( fs.readFile );

module.exports = {
  getAPI: require( './getAPI' )( readFileAsync, CRYPTOFILE_PATH ),
  getHome: require( './getHome' )( CLIENT_PATH ),
  postAPI: require( './postAPI' )( readFileAsync, CRYPTOFILE_PATH )
};
