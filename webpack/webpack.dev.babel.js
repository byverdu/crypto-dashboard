import webpack from 'webpack';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';
import merge from 'webpack-merge';
import path from 'path';
import { common, distFolder } from './webpack.common.babel';

module.exports = merge( common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve( __dirname, `${distFolder}` ),
    hot: true,
    publicPath: '/',
    port: 9000
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WatchExternalFilesPlugin({
      files: [
        './app/server/**.js'
      ]
    })
  ]
});
