import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );
const webpack = require( 'webpack' );

const distFolder = './app/client/dist';
const isServer = process.argv.pop().includes( 'server' );
const entryClient = [
  'react-hot-loader/patch',
  // 'webpack-dev-server/client?http://localhost:9000',
  // 'webpack/hot/only-dev-server',
  'webpack-hot-middleware/client',
  './app/client/app.js'
];
// const entryServer = ['./app/client/app.js'];
// const entry = isServer ? entryServer : entryClient;

module.exports = {
  entry: entryClient,
  output: {
    filename: 'bundle.js',
    path: path.resolve( __dirname, `${distFolder}` ),
    publicPath: '/'
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve( __dirname, `${distFolder}` ),
    hot: true,
    publicPath: '/',
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin([`${distFolder}`]),
    // https://webpack.js.org/guides/output-management/#setting-up-htmlwebpackplugin
    new HtmlWebpackPlugin({
      inject: false,
      template: require( 'html-webpack-template' ),
      bodyHtmlSnippet: '<section id="root"></section>',
      title: 'Crypto Dashboard'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin(),
    new WatchExternalFilesPlugin({
      files: [
        './app/server/index.js'
      ]
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