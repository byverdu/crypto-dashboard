/* eslint no-unused-vars: */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { cryptoReducers } from './redux';
import App from './containers/App';

const loggerMiddleware = createLogger();
const store = createStore(
  cryptoReducers,
  applyMiddleware( thunk, loggerMiddleware )
);

const render = ( Component ) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component store={store} />
      </AppContainer>
    </Provider>,
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
    <Provider store={store}>
      <App store={store}/>
    </Provider>,
    document.getElementById( 'root' )
  );
}
