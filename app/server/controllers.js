import {
  ROOT_PATH
} from '../config';

function getLogin( req, res ) {
  res.sendFile(
    'login.html',
    { root: `${ROOT_PATH}/client` }
  );
}

function postLogin( req, res ) {
  res.sendFile(
    'dashboard.html',
    { root: `${ROOT_PATH}/client` }
  );
}

export {
  getLogin,
  postLogin
};
