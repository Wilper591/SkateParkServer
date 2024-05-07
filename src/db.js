const pg = require("pg");
const { Pool } = pg;

const config = {
  user: "postgres",
  host: "localhost",
  database: "skatepark",
  password: "wilper591",
  port: 5432,
};

const pool = new Pool(config);

module.exports = { pool };
