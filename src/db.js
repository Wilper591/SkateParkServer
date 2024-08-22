const pg = require("pg");
const { Pool } = pg;
const dotenv = require("dotenv").config();

const config = {
  connectionString: process.env.URI_DB,
  ssl: process.env.SSL_DB === "true" ? { rejectUnauthorized: false } : false,
};

const pool = new Pool(config);

pool
  .connect()
  .then((client) => {
    console.log("Conexión exitosa a la base de datos");
    client.release(); // Libera el cliente después de la conexión
  })
  .catch((err) => console.error("Error de conexión", err.stack));

module.exports = { pool };
