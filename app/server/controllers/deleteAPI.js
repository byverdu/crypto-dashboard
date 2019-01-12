/* eslint-disable func-names */
import { deleteItem } from '../serverUtils';

const fs = require( 'fs' );

module.exports = function ( readFileAsync, pathToFile ) {
  return function ( req, res ) {
    readFileAsync(
      pathToFile,
      { encoding: 'utf8' }
    ).then(( response ) => {
      const newData = deleteItem( response, req.params.uuid );
      fs.writeFile(
        pathToFile,
        newData,
        ( err ) => {
          if ( err ) {
            throw new Error( `Write DELETE JSON error: ${err}` );
          }
          console.log( 'write file resolved after delete' );
          res.json( JSON.parse( newData ));
        }
      );
      console.log( 'readfile DELETE resolved' );
    }).catch(( err ) => {
      throw new Error( `Read DELETE JSON error: ${err}` );
    });
  };
};
