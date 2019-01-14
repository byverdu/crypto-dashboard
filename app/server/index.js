import express from 'express';
import bodyParser from 'body-parser';

import * as ctrl from './controllers';
import {
  PORT, CLIENT_PATH
} from '../config/server';

const serverPort = process.env.PORT || PORT;
const http = require( 'http' );
const websocket = require( './websocket' );

const app = express();

// our server instance
const server = http.createServer( app );

// pass server to socket.io
websocket( server );

// Parse requests as JSON
app.use( bodyParser.json());
// Serve static files
app.use( express.static( CLIENT_PATH ));

app.get( '/', ctrl.getHome );
app.get( '/api/portfolio', ctrl.getAPI );
app.post( '/api/add-entry', ctrl.postAPI );
app.delete( '/api/delete-entry/:uuid', ctrl.deleteAPI );
app.put( '/api/edit-entry/:uuid', ctrl.putAPI );

server.listen( serverPort,
  () => console.log( `Express server running at port ${PORT}` )
);

module.exports = server;
