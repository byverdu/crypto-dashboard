const mongoose = require( 'mongoose' );

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

module.exports.Crypto = mongoose.model( 'Crypto', cryptoSchema );
