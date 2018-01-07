// https://webpack.js.org/guides/
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const isServer = process.argv.pop().includes( 'server' );
const entryClient = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:9000',
  'webpack/hot/only-dev-server',
  './app/client/app.js'
];
const entryServer = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  './app/client/app.js'
];
const entry = isServer ? entryServer : entryClient;

export const distFolder = '../app/client/dist';
export const common = {
  entry,
  output: {
    filename: 'bundle.js',
    path: path.resolve( __dirname, `${distFolder}` ),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin([`${distFolder}`]),
    new HtmlWebpackPlugin({
      inject: false,
      template: require( 'html-webpack-template' ),
      bodyHtmlSnippet: '<section id="root"></section>',
      title: 'Crypto Dashboard'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  }
};
