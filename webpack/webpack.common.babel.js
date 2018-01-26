// https://webpack.js.org/guides/
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import {
  CLIENT_PATH
} from '../app/config';

export const hotReload = process.env.HOT_RELOAD;

const entryClient = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:9000',
  'webpack/hot/only-dev-server',
  './app/src/'
];
const entryServer = [
  './app/src'
];
const entry = hotReload ? entryClient : entryServer;
let rulesToUse = ['babel-loader', 'eslint-loader'];

if ( hotReload ) {
  rulesToUse = [...'react-hot-loader/webpack'];
}

export const distFolder = '../app/client/';
export const common = {
  entry,
  output: {
    filename: 'bundle.js',
    path: `${CLIENT_PATH}`,
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  plugins: [
    new CleanWebpackPlugin([`${CLIENT_PATH}`]),
    new HtmlWebpackPlugin({
      template: './app/src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: rulesToUse
      }
    ]
  }
};
