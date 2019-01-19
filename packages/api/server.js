import express from 'express';
import bodyParser from 'body-parser';
import * as ctrl from './controllers';

const socketIO = require( 'socket.io' );
const http = require( 'http' );
const em = require( './eventEmitter' );
const logger = require( './logger' );

const app = express();
// our server instance
const server = http.createServer( app );
const io = socketIO( server );

io.on( 'connection', ( socket ) => {
  logger.info( 'io-socket emitting from port 9000' );
  em.on( 'dataChanged', ( data ) => {
    logger.info( 'eventEmitter sending ...' );
    socket.emit( 'clientEvent', data );
  });
});

// Parse requests as JSON
app.use( bodyParser.json());

app.get( '/api/portfolio', ctrl.get );
app.post( '/api/add-entry', ctrl.post );
app.delete( '/api/delete-entry/:uuid', ctrl.remove );
// app.put( '/api/edit-entry/:uuid', ctrl.putAPI );

module.exports = server;
