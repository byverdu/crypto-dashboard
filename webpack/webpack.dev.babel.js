import webpack from 'webpack';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';
import merge from 'webpack-merge';
import path from 'path';
import { common, distFolder, hotReload } from './webpack.common.babel';

const devConf = {
  devtool: 'inline-source-map'
};

if ( hotReload ) {
  devConf.devServer = {
    contentBase: path.resolve( __dirname, `${distFolder}` ),
    publicPath: '/client',
    port: 9000
  };
  devConf.plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WatchExternalFilesPlugin({
      files: [
        './app/server/**.js'
      ]
    })
  ];
}

module.exports = merge( common, devConf );
