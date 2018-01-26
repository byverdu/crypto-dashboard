import {
  ROOT_PATH
} from '../config';

function getLogin( req, res ) {
  res.sendFile(
    'index.html',
    { root: `${ROOT_PATH}/client` }
  );
}

function postLogin( req, res ) {
  console.log( req.body );
  res.redirect( '/' );
}

export {
  getLogin,
  postLogin
};
