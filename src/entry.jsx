// Bootstrap magic
require('expose?$!expose?jQuery!jquery')
require('bootstrap-webpack')

// Create the DOM element which will contain our app
let containerElem = document.createElement('div')
document.body.appendChild(containerElem)

// Create the redux store for the application
import configureStore from './configurestore';
const store = configureStore();

// Implement the actor pattern.
import actors from './actors';
let acting = false;
store.subscribe(function() {
  if(acting) { return; }
  acting = true;
  for (let actor of actors) {
    actor(store.getState(), store.dispatch);
  }
  acting = false;
});

// Render the Application
import React from 'react';
import { render } from 'react-dom';
import Root from './components/root.jsx';
render(<Root store={store} />, containerElem);

// HACK: fetch sample database
import { setDatabaseFromURI } from './actions';
store.dispatch(setDatabaseFromURI('sampledb.sqlite'));
