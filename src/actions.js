import { createAction } from 'redux-actions';

//// DATABASE I/O ////

// Fetch a sqlite database from a passed URI.
let databaseURIRequest = createAction('DATABASE_URI_REQUEST');

// Set the current database to a Database instance.
let setDatabase = createAction('SET_DATABASE');

// Fetch a new SQLite database from an URI
export function databaseFromURI(uri) { return dispatch => {
  dispatch(databaseURIRequest(uri));

  // TODO: Error handling?
  fetch(uri)
    .then(response => response.arrayBuffer())
    .then(body => dispatch(databaseFromArrayBuffer(body)));
} }

// Open a new database from an ArrayBuffer
import { databaseFromArrayBuffer as _dbFromAB } from './database';
export function databaseFromArrayBuffer(buffer) { return dispatch => {
  _dbFromAB(buffer)
    .then(db => {
      dispatch(setDatabase(db));
      dispatch(queryMasterTable(db));
    });
} }

//// SCHEMA ////

// Queries happen asynchronously and so a given query will usually consist of
// the following actions:
//
// - ...Request: the query has been sent to the database
// - ...Response: the query has been received from the database
//
// ...Response actions will usually have some payload relating to the query
// outcome. Both Request and Response actions have a "database" property in
// their payload which is the Database instance the query was performed on.

// MASTER TABLE

let masterTableRequest = createAction('MASTER_TABLE_REQUEST');
let masterTableResponse = createAction('MASTER_TABLE_RESPONSE');

export function queryMasterTable(database) { return dispatch => {
  dispatch(masterTableRequest(database));
  database.queryMasterTable()
    .then(response => dispatch(masterTableResponse({ database, response })));
} }

// OBJECT INFORMATION

let objectInfoRequest = createAction('OBJECT_INFO_REQUEST');
let objectInfoResponse = createAction('OBJECT_INFO_RESPONSE');

// Update information on a SQLite object (table, view, etc) from the
// sqlite_master table for manipulation.
export function queryObjectInfo(database, name) { return dispatch => {
  dispatch(objectInfoRequest({ database, name }));
  database.queryObjectInfo(name)
    .then(response => dispatch(objectInfoResponse(
      { database, name, response })));
} }

//// UI ////

export const selectObject = createAction('SELECT_OBJECT');

