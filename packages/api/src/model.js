const mongoose = require( 'mongoose' );
const logger = require( './logger' );
const em = require( './eventEmitter' );

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
  trades: [{
    date: Date,
    closePrice: Number,
    closeAmount: Number
  }]
});

cryptoSchema.post( 'save', ( doc ) => {
  logger.info( '%s has been saved', doc._id );
  em.emit( 'itemSavedToDb', doc );
});

cryptoSchema.post( 'remove', ( doc ) => {
  logger.info( '%s has been removed', doc._id );
  em.emit( 'itemRemovedFromDb', doc );
});

module.exports.Crypto = mongoose.model( 'Crypto', cryptoSchema );
module.exports.Trade = mongoose.model( 'Trade', tradeSchema );
