import express from 'express';
import bodyParser from 'body-parser';

import * as ctrl from './controllers';
import {
  PORT, CLIENT_PATH
} from '../config/server';

const server = express();
const serverPort = process.env.PORT || PORT;

// Parse requests as JSON
server.use( bodyParser.json());
// Serve static files
server.use( express.static( CLIENT_PATH ));

server.get( '/', ctrl.getHome );
server.get( '/api/portfolio', ctrl.getAPI );
server.post( '/api/add-entry', ctrl.postAPI );
server.delete( '/api/delete-entry/:uuid', ctrl.deleteAPI );
server.put( '/api/edit-entry/:uuid', ctrl.putAPI );

server.listen( serverPort,
  () => console.log( `Express server running at port ${PORT}` )
);

module.exports = server;
