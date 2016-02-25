import sql from 'sql.js'
import Immutable from 'immutable'
import { combineReducers } from 'redux'

import { CHANGE_DATABASE } from './actions.js'

let currentDatabase = new sql.Database()

function updateSchema(existingSchema, database) {
  let schema = { tables: [], views: [] }
  let masterTable = currentDatabase.exec('SELECT * FROM SQLITE_MASTER;')[0]

  if(masterTable) {
    masterTable.values.forEach((row) => {
      if(row[0] === 'table') {
        schema.tables.push({
          name: row[2], sql: row[4]
        })
      } else if(row[0] === 'view') {
        schema.views.push({
          name: row[2], sql: row[4]
        })
      }
    })
  }

  return schema
}

function schema(state, action) {
  if(!state) { state = updateSchema(currentDatabase) }

  switch(action.type) {
    case CHANGE_DATABASE:
      currentDatabase = action.database
      state = updateSchema(currentDatabase)
      return state
    default:
      return state
  }
}

const reducer = combineReducers({ schema })

export default reducer
