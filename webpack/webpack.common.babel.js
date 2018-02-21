// https://webpack.js.org/guides/
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import {
  CLIENT_PATH, isServer
} from '../app/config/server';

const devEntryClient = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:9000',
  'webpack/hot/only-dev-server',
  './app/src/'
];
const prodEntryClient = ['./app/src/'];
const entryServer = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?http://localhost:9000',
  './app/src'
];
const links = [
  'https://npmcdn.com/bootstrap@4.0.0-beta.2/dist/css/bootstrap.min.css'
];

const entryClient = process.env.NODE !== 'production'
  ? devEntryClient : prodEntryClient;
const entry = isServer ? entryServer : entryClient;


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
      template: require( 'html-webpack-template' ),
      bodyHtmlSnippet: '<section id="root"></section>',
      title: 'Crypto Dashboard',
      inject: false,
      links
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
