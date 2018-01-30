/* eslint no-unused-vars: */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

const render = ( Component ) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById( 'root' )
  );
};

render( App );

if ( module.hot ) {
  module.hot.accept( './containers/App', () => {
    const NextApp = require( './containers/App' ).default;
    render( NextApp );
  });
} else {
  ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
  );
}
