import express from 'express';
import * as ctrl from './controllers';
import {
  PORT
} from '../config';

const server = express();

server.get( '/', ctrl.getLogin );
server.post( '/', ctrl.postLogin );

// to avoid EADDRINUSE
if ( !module.parent ) {
  server.listen( PORT );
}

module.exports = server;
