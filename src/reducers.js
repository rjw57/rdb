import sql from 'sql.js'
import Immutable from 'immutable'
import { combineReducers } from 'redux'

import { CHANGE_DATABASE, SELECT_OBJECT } from './actions.js'

/* The SQLite schema is reflected as a map of names to "objects". (This is an
 * unfortunate overlap of JavaScript and SQLite terminology.) Each "object" is a
 * table, view, index or trigger and is represented via an object with the
 * following shape:
 *
 * {
 *    type: 'table' | 'view' | 'index' | 'trigger'
 *    sql: <string>
 *
 *    ... Additional type-specific properties ...
 * }
 *
 */

// Quote a string for SQL. This has not been extensively tested so this should
// really only be used for "trusted" strings.
let unsafeSqlQuoteString = string => "'" + string.replace(/'/g, "''") + "'";

// Update an existing schema from the database.
function fetchSchema(database, schema = Immutable.Map()) {
  // FIXME: this function simply creates a new schema rather than using the
  // passed schema. This is pretty efficient but guaranteed to be correct. Once
  // we've moved past the initial implementation, this should be more
  // intelligent about merging schema objects.

  let newSchema = {};
  // For each row of the sqlite master table...
  database.each('SELECT * FROM sqlite_master', row => {
    // ... create object record
    let { name, type, sql } = row;
    let obj = Immutable.fromJS({ type, sql });

    // Additional data depends on object type
    switch(type) {
      case 'table':
        let columns = [];
        database.each(
          `PRAGMA table_info(${ unsafeSqlQuoteString(name) })`,
          row => {
            let { cid, name, type, notnull, pk, dflt_value } = row;
            columns.push({
              columnId: cid, name, type, notNull: notnull === 1,
              isPrimaryKey: pk === 1, defaultValue: dflt_value,
            });
          }
        );
        obj = obj.set('columns', new Immutable.fromJS(columns));
        break;
    }

    newSchema[name] = obj;
  });

  return Immutable.fromJS(newSchema);
}

function fetchTableInfo(database, tablename) {
  let table = [];
  database.each(
    `PRAGMA table_info(${unsafeSqlQuoteString(tablename)})`,
    row => table.push(row)
  );
  return table;
}

const initialSchema = Immutable.Map({});

function schema(state = initialSchema, action) {
  switch(action.type) {
    case CHANGE_DATABASE:
      state = fetchSchema(action.database, state);
      return state;
    default:
      return state;
  }
}

function selectedObjectName(state = null, action) {
  switch(action.type) {
    case SELECT_OBJECT:
      state = action.name;
      return state;
    default:
      return state;
  }
}

const reducer = combineReducers({ schema, selectedObjectName });

export default reducer
