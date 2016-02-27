import { createAction } from 'redux-actions';
import { databaseFromArrayBuffer } from './database.js';

let fetchDatabase = createAction('FETCH_DATABASE');
let setDatabase = createAction('SET_DATABASE');

let queryMasterTable = createAction('QUERY_MASTER_TABLE');
let setMasterTable = createAction('SET_MASTER_TABLE',
  (database, masterTable) => ({ database, masterTable }));

// Fetch a new SQLite database from an URI
export function fetchDatabase(uri) { return dispatch => {
  dispatch(fetchDatabase(uri));

  // TODO: Error handling
  fetch(uri)
    .then(response => response.arrayBuffer())
    .then(body => dispatch(openDatabaseFromArrayBuffer(body)));
} }

export function reloadSchema(database) { return dispatch => {
  dispatch(queryMasterTable(database));
  database.queryMasterTable()
    .then(masterTable => dispatch(setMasterTable(database, masterTable)));
} }

// Open a new database from an ArrayBuffer
export function openDatabaseFromArrayBuffer(buffer) { return dispatch => {
  databaseFromArrayBuffer(buffer)
    .then(db => {
      dispatch(setDatabase(db));
      dispatch(reloadSchema(db));
    });
} }

export const selectObject = createAction('SELECT_OBJECT');

let queryObjectInfo = createAction('QUERY_OBJECT_INFO',
  (database, name) => ({ database, name })
);

let setObjectInfo = createAction('SET_OBJECT_INFO',
  (database, name, info) => ({ database, name, info })
);

// Update information on a SQLite object (table, view, etc) from the
// sqlite_master table for manipulation.
export function updateObjectInfo(database, name) { return dispatch => {
  dispatch(queryObjectInfo(database, name));
  database.queryObjectInfo(name)
    .then(info => dispatch(setObjectInfo(database, name, info)));
} }

