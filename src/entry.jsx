// Bootstrap magic
require('expose?$!expose?jQuery!jquery')
require('bootstrap-webpack')

// Create the DOM element which will contain our app
let containerElem = document.createElement('div')
document.body.appendChild(containerElem)

// Create the redux store for the application
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import DevTools from './components/devtools.jsx';

import reducer from './reducers.js';

const finalCreateStore = compose(
  applyMiddleware(thunk, promise),
  DevTools.instrument()
)(createStore);
const store = finalCreateStore(reducer);

// Render the Application
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app.jsx';

render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  containerElem
)

// HACK: fetch sample database
import { fetchDatabase } from './actions.js';
store.dispatch(fetchDatabase('sampledb.sqlite'));
