const pg = require("pg");
const { Pool } = pg;
const dotenv = require("dotenv").config();

const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB,
  ssl: process.env.SSL_DB,
};
/* const config = {
  user: "postgres",
  host: "localhost",
  database: "skatepark",
  password: "wilper591",
  port: 5432,
}; */
const pool = new Pool(config);

module.exports = { pool };
