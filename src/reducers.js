import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const initialDatabase = null;
let database = handleActions({
  SET_DATABASE: (state, action) => action.payload,
}, initialDatabase);

const initialObjects = Immutable.List();
let objects = handleActions({
  MASTER_TABLE_RESPONSE: (state, action) => {
    let { response } = action.payload;
    if(!response) { return state; }

    let newObjects = response.map(row => {
      let { name, type, tbl_name, sql } = row;
      return { name, type, tableName: tbl_name, sql };
    });

    state = Immutable.fromJS(newObjects);
    return state;
  },
}, initialObjects);

const initialObjectInfoByName = Immutable.Map();
let objectInfoByName = handleActions({
  OBJECT_INFO_RESPONSE: (state, action) => {
    let { response, name } = action.payload;
    state = state.set(name, Immutable.fromJS(response));
    return state;
  },
}, initialObjectInfoByName);

let selectedObjectName = handleActions({
  SELECT_OBJECT: (state, action) => action.payload
}, null);

const rootReducer = combineReducers({
  database, objects, objectInfoByName, selectedObjectName
});

export default rootReducer;
