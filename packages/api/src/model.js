const mongoose = require( 'mongoose' );
const logger = require( './logger' );
const em = require( './eventEmitter' );
const { exec } = require( 'child_process' );

const triggerDbDump = () => {
  exec( 'mongodump -o ../backup --db crypto-dashboard', ( err, stdout, stderr ) => {
    if ( err ) {
      console.log( err, stderr );
    } else {
      console.log( stdout );
    }
  });
};

const cryptoSchema = new mongoose.Schema({
  dateCreation: { type: Date, default: Date.now },
  fiatName: String,
  dateCrypto: Date,
  uuid: String,
  exchangeData: {
    selectedExchange: String,
    selectedCrypto: String,
    selectedPair: String
  },
  pairToWatch: String,
  amountCrypto: Number,
  priceCrypto: Number,
  amountInvested: Number
});

const tradeSchema = new mongoose.Schema({
  uuid: String,
  crypto: String,
  trades: [{
    date: Date,
    closePrice: Number,
    closeAmount: Number
  }]
});

cryptoSchema.post( 'save', ( doc ) => {
  ( async function () {
    try {
      await logger.info( '%s has been saved', doc._id );
      await em.emit( 'itemSavedToDb', doc );
      triggerDbDump();
    } catch ( e ) {
      console.log( `Post Save: ${e}` );
    }
  }());
});

cryptoSchema.post( 'remove', ( doc ) => {
  ( async function () {
    try {
      await logger.info( '%s has been removed', doc._id );
      await em.emit( 'itemRemovedFromDb', doc );
      triggerDbDump();
    } catch ( e ) {
      console.log( `Post Save: ${e}` );
    }
  }());
});

module.exports.Crypto = mongoose.model( 'Crypto', cryptoSchema );
module.exports.Trade = mongoose.model( 'Trade', tradeSchema );
