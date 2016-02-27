import { applyMiddleware, compose, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';

import rootReducer from './reducers.js';

const enhancer = compose(applyMiddleware(thunk, promise));
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
