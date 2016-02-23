import sql from "sql.js";

console.log("Hello");

let db = new sql.Database();

db.exec(`
    CREATE TABLE foo
    (
      id INTEGER PRIMARY KEY,
      name STRING,
      age NUMBER
    );
`);

console.log(db.exec("SELECT * FROM SQLITE_MASTER;"));
