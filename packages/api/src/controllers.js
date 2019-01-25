const { Crypto } = require( './model' );

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

    res.send([doc]);
  });
};

export const remove = ( req, res ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );

  Crypto.findOneAndDelete({ uuid: req.params.uuid }, ( err, doc ) => {
    if ( err ) throw Error( err );

    res.send([doc]);
  });
};

