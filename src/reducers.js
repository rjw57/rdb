import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const initialDatabase = null;
let database = handleActions({
  SET_DATABASE: (state, action) => action.payload,
  SAVE_DATABASE: (state, action) => {
    let database = action.payload;
    database.export().then(buffer => {
      let blob = new Blob([buffer], {type: 'octet/stream'});
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'database.sqlite';
      a.click();
      window.URL.revokeObjectURL(url);
    });
    return state;
  },
}, initialDatabase);

// The object mapping holds all the information on a particular mapping used by
// the UI. Objects are keyed by their name. Each object is a map with the
// following shape:
//
//  {
//    name: <string>,
//    type: "table" | "view" | "index" | "trigger",
//    tableName: <string>,
//    sql: <string>,
//
//    // ... additional properties
//  }
//
// The additional properties are type dependent. For tables and views:
//
//  {
//    isQueryingColumns: <bool>,
//    columns: Array<Column>?,
//    page: { offset: Number, limit: Number },
//    isQueryingValues: <bool>,
//    values: Array<Array<Object>>,
//  }

const initialObjectsByName = Immutable.Map();
const initialViewAndTable = Immutable.Map({
  isQueryingColumns: false, columns: null,
  isQueryingValues: false, values: null,
  page: { offset: 0, limit: 50 },
});

let objectsByName = handleActions({
  MASTER_TABLE_RESPONSE: (state, action) => {
    let { response } = action.payload;

    // When there's a new master table, we blow away the object mapping
    // entirely. Inefficient for the moment but simple to follow.
    state = initialObjectsByName;
    if(!response) { return state; }

    // For each row in the master table...
    response.forEach(row => {
      let { name, type, tbl_name, sql } = row;
      let object = Immutable.Map({ name, type, tableName: tbl_name, sql });

      // Type-specific additions
      switch(type) {
        case 'table':
        case 'view':
          object = object.merge(initialViewAndTable);
          break;
      }

      // Add object to state
      state = state.set(name, object);
    });

    return state;
  },
  OBJECT_INFO_REQUEST: (state, action) => {
    let { name } = action.payload;
    let object = state.get(name);

    // Do nothing if we know nothing of this object
    if(!object) { return state; }

    // Record the fact we're querying info on this object
    switch(object.get('type')) {
      case 'table':
      case 'view':
        object = object.merge({ isQueryingColumns: true, columns: null });
        break;
    }

    // Update object in state
    state = state.set(name, object);
    return state;
  },
  OBJECT_INFO_RESPONSE: (state, action) => {
    let { response, name } = action.payload;
    let object = state.get(name);

    // Do nothing if we know nothing of this object
    if(!object) { return state; }

    // Type-specific action
    switch(object.get('type')) {
      case 'table':
      case 'view':
        object = object.merge({
          isQueryingColumns: false, columns: response.columns
        });
        break;
    }

    // Update object in state
    state = state.set(name, object);
    return state;
  },
}, initialObjectsByName);

let selectedObjectName = handleActions({
  SELECT_OBJECT: (state, action) => action.payload
}, null);

const rootReducer = combineReducers({
  database, objectsByName, selectedObjectName
});

export default rootReducer;
