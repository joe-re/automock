import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers);

const rootElement = document.getElementById('application');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
