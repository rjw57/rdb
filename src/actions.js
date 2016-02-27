import { createAction } from 'redux-actions';
import { databaseFromArrayBuffer } from './database.js';

let requestDatabase = createAction('REQUEST_DATABASE');
let changeDatabase = createAction('CHANGE_DATABASE');

// Fetch a new SQLite database from an URI
export function fetchDatabase(uri) { return dispatch => {
  dispatch(requestDatabase(uri));

  // TODO: Error handling
  fetch(uri)
    .then(response => response.arrayBuffer())
    .then(body => databaseFromArrayBuffer(body))
    .then(db => dispatch(changeDatabase(db)));
} }

// Select a SQLite object (table, view, etc) from the sqlite_master table for
// manipulation. Only one object may be selected at a time. Pass an object name
// of "null" to deselect all objects.
export const selectObject = createAction('SELECT_OBJECT');

