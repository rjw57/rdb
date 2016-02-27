// Interface to SQLite database
import sql from 'sql.js';

// Quote a string for SQL. This has not been extensively tested so this should
// really only be used for "trusted" strings.
let unsafeSqlQuoteString = string => "'" + string.replace(/'/g, "''") + "'";

class Database {
  constructor(db = new sql.Database()) {
    if(!db) { throw new Error('No database passed'); }
    this._db = db;
    this._cachedMasterTable = null;
  }

  // Return a Promise resolved with an array representation of the sqlite_master
  // table.
  queryMasterTable() {
    return new Promise(resolve => resolve(this._syncQueryMasterTable()));
  }

  _syncQueryMasterTable() {
    if(this._cachedMasterTable) { return this._cachedMasterTable; }

    let masterTable = [];
    this._db.each('SELECT * FROM sqlite_master', row => {
      masterTable.push(row);
    });

    this._cachedMasterTable = masterTable;
    return this._cachedMasterTable;
  }

  // Return a Promise resolved with an array of columns for the named table.
  queryTableInfo(name) {
    return new Promise(resolve => resolve(this._syncQueryTableInfo(name)));
  }

  _syncQueryTableInfo(name) {
    let columns = [];
    this._db.each(`PRAGMA table_info(${ unsafeSqlQuoteString(name) })`, row => {
      columns.push(row);
    });
    return columns;
  }
}

// Returns a promise resolved with a database initialised from the contents of
// the passed array buffer
export function databaseFromArrayBuffer(arrayBuffer) {
  return new Promise((resolve, reject) => (
    resolve(new Database(new sql.Database(new Uint8Array(arrayBuffer))))
  ));
}
