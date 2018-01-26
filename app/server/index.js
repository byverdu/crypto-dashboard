import express from 'express';
import bodyParser from 'body-parser';
// import path from 'path';
import * as ctrl from './controllers';
import {
  PORT, CLIENT_PATH
} from '../config';

const server = express();

// Parse requests as JSON
server.use( bodyParser.urlencoded({ extended: false }));
// Serve static files
server.use( express.static( CLIENT_PATH ));

server.get( '/', ctrl.getLogin );
server.post( '/', ctrl.postLogin );

// to avoid EADDRINUSE
if ( !module.parent ) {
  server.listen( PORT );
}

module.exports = server;
