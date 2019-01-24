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
  pairToWarch: String,
  amountCrypto: Number,
  priceCrypto: Number,
  amountInvested: Number
});

cryptoSchema.post( 'save', ( doc ) => {
  logger.info( '%s has been saved', doc._id );
  em.emit( 'dataChanged', doc );
});

module.exports.Crypto = mongoose.model( 'Crypto', cryptoSchema );
