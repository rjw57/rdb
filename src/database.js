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

  // Returns a Promise which is resolved with an object of the following shape
  // for a single query:
  //
  // { columns: Array<string>, values: Array<Array<Object>> }
  query(sql, params) {
    console.log('Database query:', sql, params);
    return new Promise(resolve => {
      let statement = this._db.prepare(sql, params);

      let values = [], columns = null;
      while(statement.step()) {
        if(!columns) { columns = statement.getColumnNames(); }
        values.push(statement.get());
      }

      resolve({ columns, values });
    });
  }

  // Return a Promise resolved with an array representation of the sqlite_master
  // table.
  queryMasterTable() {
    return new Promise(resolve => resolve(this._syncQueryMasterTable()));
  }

  _syncQueryMasterTable() {
    if(this._cachedMasterTable) { return this._cachedMasterTable; }

    console.log('Database query master table');
    let masterTable = [];
    this._db.each('SELECT * FROM sqlite_master', row => {
      masterTable.push(row);
    });

    this._cachedMasterTable = masterTable;
    return this._cachedMasterTable;
  }

  queryObjectInfo(name) {
    return new Promise(resolve => resolve(this._syncQueryObjectInfo(name)));
  }

  _syncQueryObjectInfo(name) {
    console.log('Database query object info:', name);
    let masterTableEntry = null;
    this._db.each(
      'SELECT * FROM sqlite_master WHERE name = $name',
      {$name: name},
      row => { masterTableEntry = row; }
    );

    if(!masterTableEntry) { throw new Error('No object named "' + name + '"'); }

    let { tbl_name, sql, type } = masterTableEntry;
    let info = { name, tableName: tbl_name, sql, type };

    switch(type) {
      case 'table':
        let columns = [];
        this._db.each(
          `PRAGMA table_info(${ unsafeSqlQuoteString(name) })`,
          row => columns.push(row)
        );
        info.columns = columns;
        break;
    }

    return info;
  }
}

// Returns a promise resolved with a database initialised from the contents of
// the passed array buffer
export function databaseFromArrayBuffer(arrayBuffer) {
  return new Promise((resolve, reject) => (
    resolve(new Database(new sql.Database(new Uint8Array(arrayBuffer))))
  ));
}
