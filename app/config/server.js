import path from 'path';

const PORT = 9000;
const ROOT_PATH = __dirname;
const CLIENT_PATH = path.join( __dirname, '../client' );
const CRYPTOFILE_PATH = path.join( __dirname, '../data/portfolio.json' );
const isServer = process.argv.pop().includes( 'express-server' );

export {
  PORT,
  ROOT_PATH,
  CLIENT_PATH,
  CRYPTOFILE_PATH,
  isServer
};
