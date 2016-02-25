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
