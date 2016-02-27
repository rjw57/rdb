import { applyMiddleware, compose, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import DevTools from './components/devtools.jsx';

import rootReducer from './reducers.js';

const enhancer = compose(
  applyMiddleware(thunk, promise),
  DevTools.instrument()
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}
