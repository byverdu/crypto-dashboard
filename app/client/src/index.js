import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { cryptoReducers } from './redux';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();
const store = createStore(
  cryptoReducers,
  applyMiddleware( thunk, loggerMiddleware )
);

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById( 'root' )
);
registerServiceWorker();
