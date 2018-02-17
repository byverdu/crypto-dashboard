import express from 'express';
import bodyParser from 'body-parser';

import * as ctrl from './controllers';
import {
  PORT, CLIENT_PATH, isServer
} from '../config/server';

const server = express();

// Parse requests as JSON
server.use( bodyParser.urlencoded({ extended: false }));
// Serve static files
server.use( express.static( CLIENT_PATH ));


if ( isServer ) {
  const webpack = require( 'webpack' );
  const webpackDevMiddleware = require( 'webpack-dev-middleware' );
  const config = require( '../../webpack/webpack.dev.babel' );
  const compiler = webpack( config );
  server.use( webpackDevMiddleware( compiler, {
    publicPath: config.output.publicPath,
    hot: true
  }));
  server.use( require( 'webpack-hot-middleware' )( compiler ));
}

server.get( '/', ctrl.getHome );
server.get( '/api/crypto', ctrl.getAPI );
server.post( '/', ctrl.postAPI );

// to avoid EADDRINUSE
if ( !module.parent ) {
  const serverPort = process.env.PORT || PORT;
  server.listen( serverPort );
}

module.exports = server;
