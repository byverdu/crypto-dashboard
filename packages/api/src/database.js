const mongoose = require( 'mongoose' );
const logger = require( './logger' );

module.exports.connectDatabase = function connectDatabase( MONGODB_URI, debug ) {
  mongoose.set( 'debug', debug );
  return new Promise(( resolve, reject ) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on( 'error', error => reject( error ))
      .on( 'close', () => logger.info( 'Database connection closed.' ))
      .once( 'open', () => {
        resolve( mongoose.connections[ 0 ]);
        logger.info( 'open connection' );
      });

    mongoose.connect(
      MONGODB_URI,
      { useNewUrlParser: true }
    );
  });
};
