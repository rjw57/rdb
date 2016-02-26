// Bootstrap magic
require('expose?$!expose?jQuery!jquery')
require('bootstrap-webpack')

// Create the DOM element which will contain our app
let containerElem = document.createElement('div')
document.body.appendChild(containerElem)

// Create the redux store for the application
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

import reducer from './reducers'

const logger = createLogger()
const finalCreateStore = compose(
    applyMiddleware(thunk, promise, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
const store = finalCreateStore(reducer)

// Render the Application
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/app.jsx'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  containerElem
)

// HACK: fetch sample database
import { fetchDatabase } from './actions.js'
store.dispatch(fetchDatabase('sampledb.sqlite'))
