const url = 'mongodb://localhost:27017/crypto-dashboard';
const { MONGODB_URI = url, NODE_ENV = 'development', PORT = 9000 } = process.env;
const logger = require( './logger' );
const server = require( './server' );
const { connectDatabase } = require( './database' );

( async () => {
  try {
    await connectDatabase( MONGODB_URI, NODE_ENV !== 'production' );
  } catch ( error ) {
    logger.error( 'Could not connect to database', { error });
    throw error;
  }

  server.listen( PORT,
    () => console.log( `Express server running at port ${PORT}` )
  );
})();
