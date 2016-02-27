import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const initialDatabase = null;
let database = handleActions({
  SET_DATABASE: (state, action) => action.payload,
  FETCH_DATABASE: (state, action) => initialDatabase,
}, initialDatabase);

// Immutable Map of keys to database objects. Each database "object" is
// represented via an Immutable JavaScript map with the following shape:
//
//    { name: <string>, type: <string>, tableName: <string> }
//
// where type is one of table, view, index or trigger.
const initialObjects = Immutable.Map();
let objects = handleActions({
  QUERY_MASTER_TABLE: (state, action) => initialObjects,
  SET_MASTER_TABLE: (state, action) => {
    let { masterTable } = action.payload;
    if(!masterTable) { return state; }

    let newObjects = {};
    masterTable.forEach(row => {
      let { name, type, tbl_name, sql } = row;
      let key = 'obj_' + name;
      newObjects[key] = {
        name, type, tableName: tbl_name, sql
      };
    });

    state = Immutable.fromJS(newObjects);
    return state;
  },
}, initialObjects);

let selectedObjectName = handleActions({
  SELECT_OBJECT: (state, action) => action.payload
}, null);

const rootReducer = combineReducers({
  database, objects, selectedObjectName
});

export default rootReducer;
