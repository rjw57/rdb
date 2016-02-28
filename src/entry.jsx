// Bootstrap magic
require('expose?$!expose?jQuery!jquery')
require('bootstrap-webpack')

// Create the DOM element which will contain our app
let containerElem = document.createElement('div')
document.body.appendChild(containerElem)

// Create the redux store for the application
import configureStore from './configurestore';
const store = configureStore();

// Render the Application
import React from 'react';
import { render } from 'react-dom';
import Root from './components/root.jsx';
render(<Root store={store} />, containerElem);

// HACK: fetch sample database
import { databaseFromURI } from './actions';
store.dispatch(databaseFromURI('sampledb.sqlite'));
