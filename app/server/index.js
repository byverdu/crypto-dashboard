import express from 'express';
import bodyParser from 'body-parser';
import * as ctrl from './controllers';
import {
  PORT, ROOT_PATH
} from '../config';

const server = express();

if ( process.env.NODE_ENV === 'development' ) {
  const webpack = require( 'webpack' );
  const webpackDevMiddleware = require( 'webpack-dev-middleware' );
  const config = require( '../../webpack/webpack.dev.babel' );
  const compiler = webpack( config );
  server.use( webpackDevMiddleware( compiler, {
    publicPath: config.output.publicPath
  }));
  server.use( require( 'webpack-hot-middleware' )( compiler ));
}

// Parse requests as JSON
server.use( bodyParser.urlencoded({ extended: false }));
// Serve static files
server.use( `${ROOT_PATH}/client`, express.static( 'client' ));

server.get( '/', ctrl.getLogin );
server.post( '/', ctrl.postLogin );

// to avoid EADDRINUSE
if ( !module.parent ) {
  server.listen( PORT );
}

module.exports = server;
