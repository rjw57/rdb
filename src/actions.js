import sql from 'sql.js'

export const REQUEST_DATABASE = 'REQUEST_DATABASE'
export const CHANGE_DATABASE = 'CHANGE_DATABASE'

// Not exported. Use fetchDatabase
function requestDatabase(uri) { return {
  type: REQUEST_DATABASE, uri
} }

// Not exported.
function changeDatabase(database) { return {
  type: CHANGE_DATABASE, database
} }

// Fetch a new SQLite database from an URI
export function fetchDatabase(uri) { return dispatch => {
  dispatch(requestDatabase(uri))

  // TODO: Error handling
  fetch(uri).then(response => response.arrayBuffer()).then(body => {
    let newDb = new sql.Database(new Uint8Array(body))
    dispatch(changeDatabase(newDb))
  })
} }

export const SELECT_OBJECT = 'SELECT_OBJECT'

// Select a SQLite object (table, view, etc) from the sqlite_master table for
// manipulation. Only one object may be selected at a time. Pass an object name
// of "null" to deselect all objects.
export function selectObject(name) {
  return { type: SELECT_OBJECT, name }
}
