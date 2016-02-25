import sql from 'sql.js'
import Immutable from 'immutable'
import { combineReducers } from 'redux'

import { CHANGE_DATABASE } from './actions.js'

function fetchMasterTable(database) {
  let table = []
  database.each('SELECT * FROM SQLITE_MASTER', row => table.push(row))
  return table
}

function unsafeSqlQuoteString(string) {
  return "'" + string.replace(/'/g, "''") + "'"
}

function fetchTableInfo(database, tablename) {
  let table = []
  database.each(
    `PRAGMA table_info(${unsafeSqlQuoteString(tablename)})`,
    row => table.push(row)
  )
  return table
}

const initialSchema = {
  masterTable: [],
  tables: {},
}

function schema(state = initialSchema, action) {
  switch(action.type) {
    case CHANGE_DATABASE:
      let masterTable = fetchMasterTable(action.database)
      let tables = {}
      masterTable.filter(row => row.type == 'table').forEach(row => (
        tables[row.name] = fetchTableInfo(action.database, row.name)
      ))
      state = { masterTable, tables };
      return state
    default:
      return state
  }
}

const reducer = combineReducers({ schema })

export default reducer
