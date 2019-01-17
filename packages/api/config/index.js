import path from 'path';

const isDevEnv = process.env.NODE_ENV === 'development';
const cryptoPath = isDevEnv ? '../data/test-portfolio.json' : '../data/portfolio.json';

const PORT = 9000;
const ROOT_PATH = __dirname;
const CRYPTOFILE_PATH = path.join( __dirname, `${cryptoPath}` );

export {
  PORT,
  ROOT_PATH,
  CRYPTOFILE_PATH
};
