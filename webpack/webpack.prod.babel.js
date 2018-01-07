import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import merge from 'webpack-merge';
import { common } from './webpack.common.babel';

module.exports = merge( common, {
  plugins: [
    new UglifyJSPlugin()
  ]
});
