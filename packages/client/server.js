const express = require('express');
const path = require('path');
const bodyParser = require( 'body-parser' );
const app = express();

// express settings
const port = process.env.port || 3000;
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'build')));

app.options('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

// route handler
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(`${port}`, () => {
  console.log(`app running on port ${port}`);
});