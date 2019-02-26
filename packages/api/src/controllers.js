const { Crypto } = require( './model' );
const logger = require( './logger' );
const em = require( './eventEmitter' );

export const get = ( req, res ) => {
  res.setHeader( 'Access-Control-Allow-Origin', '*' );
  Crypto.find({}, ( err, docs ) => {
    if ( err ) throw Error( err );

    res.send( docs );
  });
};

export const post = ( req, res ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  Crypto.create({ ...req.body }, ( err, doc ) => {
    if ( err ) throw Error( err );

    res.send( doc );
  });
};

export const remove = ( req, res ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );

  Crypto.findOneAndDelete({ uuid: req.params.uuid }, ( err, doc ) => {
    if ( err ) throw Error( err );
    res.send( doc );
    doc.remove();
  });
};

export const update = ( req, res ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );

  Crypto.findOneAndUpdate({ uuid: req.params.uuid }, req.body.data, { new: true }, ( err, doc ) => {
    if ( err ) throw Error( err );
    logger.info( '%s has been removed', doc._id );
    em.emit( 'itemSavedToDb', doc );
    res.send( doc );
  });
};

