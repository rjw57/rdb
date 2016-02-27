import Immutable from 'immutable';

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { fetchSchema } from './sqlite-utils.js';

const initialSchema = Immutable.Map({});

let schema = handleActions({
  CHANGE_DATABASE: (state, action) => fetchSchema(action.payload, state),
}, initialSchema);

let selectedObjectName = handleActions({
  SELECT_OBJECT: (state, action) => action.payload
}, null);

const reducer = combineReducers({ schema, selectedObjectName });

export default reducer;
