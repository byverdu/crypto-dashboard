/* eslint-disable func-names */

module.exports = function ( readFileAsync, pathToFile ) {
  return function ( req, res ) {
    readFileAsync(
      pathToFile,
      { encoding: 'utf8' }
    ).then(( response ) => {
      res.json( JSON.parse( response ));
      console.log( 'readfile API resolved' );
    }).catch(( err ) => {
      throw new Error( `Read JSON error: ${err}` );
    });
  };
};
