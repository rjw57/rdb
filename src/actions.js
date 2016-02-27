import { createAction } from 'redux-actions';
import { databaseFromArrayBuffer } from './database.js';

let fetchDatabase = createAction('FETCH_DATABASE');
let setDatabase = createAction('SET_DATABASE');

let queryMasterTable = createAction('QUERY_MASTER_TABLE');
let setMasterTable = createAction('SET_MASTER_TABLE',
  (database, masterTable) => ({ database, masterTable }));

// Fetch a new SQLite database from an URI
export function fetchDatabase(uri) { return dispatch => {
  let fetchedDb = null;
  dispatch(fetchDatabase(uri));

  // TODO: Error handling
  fetch(uri)
    .then(response => response.arrayBuffer())
    .then(body => databaseFromArrayBuffer(body))
    .then(db => {
      dispatch(setDatabase(db));
      dispatch(queryMasterTable(db));
      fetchedDb = db;
      return db.queryMasterTable();
    })
    .then(masterTable => dispatch(setMasterTable(fetchedDb, masterTable)));
} }

let queryTableInfo = createAction(
  'QUERY_TABLE_INFO', (database, name) => ({ database, name })
);

let setTableInfo = createAction(
  'SET_TABLE_INFO',
  (database, name, columns) => ({ database, name, columns })
);

// Update information on a Database table
export function updateTableInfo(database, name) { return dispatch => {
  dispatch(queryTableInfo(database, name));
  database.queryTableInfo(name).then(columns => {
    dispatch(setTableInfo(database, name, columns));
  });
} }

let setSelectedObjectName = createAction('SET_SELECTED_OBJECT_NAME');
let queryObjectInfo = createAction('QUERY_OBJECT_INFO',
  (database, name) => ({ database, name })
);
let setObjectInfo = createAction('SET_OBJECT_INFO',
  (database, name, info) => ({ database, name, info })
);

// Select a SQLite object (table, view, etc) from the sqlite_master table for
// manipulation. Only one object may be selected at a time. Pass an object name
// of "null" to deselect all objects.
export function selectObject(database, name) { return dispatch => {
  dispatch(setSelectedObjectName(name));
  dispatch(queryObjectInfo(database, name));
  database.queryObjectInfo(name)
    .then(info => dispatch(setObjectInfo(database, name, info)));
} }

