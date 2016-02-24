// Bootstrap magic
require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');

import { createStore } from "redux";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import rdbApp from "./reducers";
import App from "./components/app.jsx";

// Create the redux store for the application
let store = createStore(rdbApp);

// Create the DOM element which will contain our app
let containerElem = document.createElement('div');
document.body.appendChild(containerElem);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  containerElem
);
