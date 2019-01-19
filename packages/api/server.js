import express from 'express';
import bodyParser from 'body-parser';
import * as ctrl from './controllers';

const http = require( 'http' );

const app = express();
// our server instance
const server = http.createServer( app );


// Parse requests as JSON
app.use( bodyParser.json());

app.get( '/api/portfolio', ctrl.get );
app.post( '/api/add-entry', ctrl.post );
app.delete( '/api/delete-entry/:uuid', ctrl.remove );
// app.put( '/api/edit-entry/:uuid', ctrl.putAPI );

module.exports = server;
