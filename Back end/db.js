const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "productsdb",   
  password: "Seevagan@12",
  port: 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected Successfully"))
  .catch(err => console.error("Database Connection Error:", err));

module.exports = pool;
