import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

let database = handleActions({
  CHANGE_DATABASE: (state, action) => action.payload,
}, null);

let selectedObjectName = handleActions({
  SELECT_OBJECT: (state, action) => action.payload
}, null);

const rootReducer = combineReducers({
  database, selectedObjectName
});

export default rootReducer;
