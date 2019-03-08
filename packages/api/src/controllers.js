const { Crypto, Trade } = require( './model' );
const logger = require( './logger' );
const em = require( './eventEmitter' );

export const get = async ( req, res ) => {
  res.setHeader( 'Access-Control-Allow-Origin', '*' );
  const crypto = await Crypto.find({});
  const trades = await Trade.find({});
  res.send({
    crypto,
    trades
  });
};

export const post = ( req, res ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  Crypto.create({ ...req.body }, ( err, doc ) => {
    if ( err ) throw Error( err );
    logger.info( '%s has been added', doc._id );
    res.send( doc );
  });
};

export const remove = ( req, res ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );

  Crypto.findOneAndDelete({ uuid: req.params.uuid }, ( err, doc ) => {
    if ( err ) throw Error( err );
    logger.info( '%s has been deleted', doc._id );
    res.send( doc );
    doc.remove();
  });
};

export const update = ( req, res ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );

  Crypto.findOneAndUpdate({ uuid: req.params.uuid }, req.body.data, { new: true }, ( err, doc ) => {
    if ( err ) throw Error( err );
    logger.info( '%s has been updated', doc._id );
    em.emit( 'itemSavedToDb', doc );
    res.send( doc );
  });
};

export const updateTrade = ( req, res ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  console.log( 'hitttttthgh' );

  Trade.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true, upsert: true }, ( err, doc ) => {
    console.log( req.body );
    if ( err ) throw Error( err );
    logger.info( '%s has been updated', doc._id );
    res.send( doc );
  });
};

