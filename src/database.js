// Interface to SQLite database

import Immutable from 'immutable';
import sql from 'sql.js';

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

class Database {
  constructor(db = new sql.Database()) {
    if(!db) { throw new Error('No database passed'); }
    this._db = db;
    this._cachedSchema = null;
  }

  static fromArrayBuffer(arrayBuffer) {
    return new Database(new sql.Database(new Uint8Array(arrayBuffer)));
  }

  // Return an Immutable.js representation of the schema. See above.
  fetchSchema() {
    // Return the cached schema if it exists
    if(this._cachedSchema) { return this._cachedSchema; }

    // FIXME: this function simply creates a new schema rather than merging with a
    // cached schema. This is pretty inefficient but guaranteed to be correct. Once
    // we've moved past the initial implementation, this should be more
    // intelligent about merging schema objects.

    let newSchema = {};

    // For each row of the sqlite master table...
    this._db.each('SELECT * FROM sqlite_master', row => {
      // ... create object record
      let { name, type, sql } = row;
      let obj = Immutable.fromJS({ type, sql });

      // Additional data depends on object type
      switch(type) {
        case 'table':
          let columns = [];
          this._db.each(
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
}

export default Database;
