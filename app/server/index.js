import express from 'express';
import * as ctrl from './controllers';
import {
  PORT
} from '../config';

const server = express();

server.get( '/', ctrl.getIndex );

// to avoid EADDRINUSE
if ( !module.parent ) {
  server.listen( PORT );
}

module.exports = server;
