/* eslint-disable func-names */
import { deleteItem } from '../serverUtils';

const fs = require( 'fs' );

module.exports = function ( readFileAsync, pathToFile ) {
  return function ( req, res ) {
    readFileAsync(
      pathToFile,
      { encoding: 'utf8' }
    ).then(( response ) => {
      const newData = deleteItem( response, req.body );
      fs.writeFile(
        pathToFile,
        newData,
        ( err ) => {
          if ( err ) {
            throw new Error( `Write JSON error: ${err}` );
          }
          console.log( 'write file resolved after delete' );
          res.redirect( '/api/crypto' );
        }
      );
      console.log( 'readfile POST resolved' );
    }).catch(( err ) => {
      throw new Error( `Read JSON error: ${err}` );
    });
  };
};
