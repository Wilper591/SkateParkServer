const { pool } = require("../db.js");

const createUser = async (email, nombre, password, anos_experiencia, especialidad, foto) => {
  try {
    /* Inicia la transacción */
    await pool.query("BEGIN");
    let estado = false;
    let fotoURL = `http://localhost:3000/${foto}`;
    const query = `INSERT INTO skaters(email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const values = [email, nombre, password, anos_experiencia, especialidad, fotoURL, `${estado}`];
    const newUser = await pool.query(query, values);

    if (!newUser.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      return {
        status: "Error",
        message: "No se pudo crear al nuevo usuario",
        code: 500,
      };
    } else {
      /* Finaliza transcción */
      await pool.query("COMMIT");
      /* Success */
      return {
        status: "Success",
        message: "Usuario creado Éxitosamente",
        code: 200,
        nuevoUsuario: newUser.rows,
      };
    }
  } catch (error) {
    await pool.end();
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Creacion de nuevo usuario fallida.",
    };
  }
};

module.exports = { createUser };
