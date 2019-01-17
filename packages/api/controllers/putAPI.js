/* eslint-disable func-names */
import { editItem } from '../serverUtils';

const fs = require( 'fs' );

module.exports = function ( readFileAsync, pathToFile ) {
  return function ( req, res ) {
    readFileAsync(
      pathToFile,
      { encoding: 'utf8' }
    ).then(( response ) => {
      const newData = editItem( response, req.body );
      fs.writeFile(
        pathToFile,
        newData,
        ( err ) => {
          if ( err ) {
            throw new Error( `Write EDIT JSON error: ${err}` );
          }
          console.log( 'write file resolved after EDIT' );
          res.json( JSON.parse( newData ));
        }
      );
      console.log( 'readfile EDIT resolved' );
    }).catch(( err ) => {
      throw new Error( `Read EDIT JSON error: ${err}` );
    });
  };
};
