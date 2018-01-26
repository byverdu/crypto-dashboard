import path from 'path';

const PORT = 9000;
const ROOT_PATH = __dirname;
const CLIENT_PATH = path.join( __dirname, '/client' );

export {
  PORT,
  ROOT_PATH,
  CLIENT_PATH
};
