/* eslint-disable func-names */

module.exports = function ( pathToClient ) {
  return function ( req, res ) {
    res.sendFile(
      'index.html',
      { root: pathToClient }
    );
  };
};
