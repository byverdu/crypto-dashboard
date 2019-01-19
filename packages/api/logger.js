const winston = require( 'winston' );

const { NODE_ENV } = process.env;

let level, 
transports;

switch ( NODE_ENV ) {
  case 'production':
    level = 'verbose';
    transports = [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: 'combined.log',
        level: 'verbose'
      })
    ];
    break;

  default:
    level = 'verbose';
    transports = [new winston.transports.Console()];
    break;
}

module.exports = winston.createLogger({
  level,
  transports
});
