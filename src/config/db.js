const psql = require("pg");
const { Pool } = psql;

const db = new Pool({
  user: "irfan",
  host: "localhost",
  database: "irfan",
  password: "irfan123",
  port: 5432,
});

module.exports = db;