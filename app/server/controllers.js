import {
  ROOT_PATH
} from '../config';

function getIndex( req, res ) {
  res.sendFile(
    'login.html',
    { root: `${ROOT_PATH}/client` }
  );
}

export {
  getIndex
};
