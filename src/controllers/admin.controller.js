const { pool } = require("../db.js");
const jwt = require("jsonwebtoken");
/* JWT Config */
const secretKey = "Mi Llave Ultra Secreta de Admin";
const loginAdmin = async (email, password) => {
  try {
    const text =
      "SELECT email, password FROM administradores WHERE email = $1 AND password = $2;";
    const values = [email, password];
    const result = await pool.query(text, values);

    if (!result.rowCount) {
      return {
        status: "Error",
        message: "No se pudo iniciar sesión.",
        code: 500,
      };
    } else {
      return {
        status: "Success",
        message: "Inicio de sesión exitoso!.",
        code: 200,
        result: result.rows,
      };
    }
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Login fallido",
    };
  }
};

const getUsersAdmin = async (token) => {
  try {
    jwt.verify(token, secretKey);
    const query =
      "SELECT id, nombre, anos_experiencia, especialidad, foto, estado FROM skaters ORDER BY id ASC;";
    const result = await pool.query(query);

    if (!result.rowCount) {
      /* Error */
      return {
        status: "Error",
        message: "No se pudo obtener el listado de Skaters.",
        code: 500,
      };
    } else {
      /* Success */
      return {
        status: "Success",
        message: "Listado de Skaters obtenido exitosamente.",
        code: 200,
        list: result.rows,
      };
    }
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Error al obtener usuarios fallido",
    };
  }
};
const updateState = async (estado, id, token) => {
  try {
    jwt.verify(token, secretKey);
    await pool.query("BEGIN");
    const query = "UPDATE skaters SET estado = $1 WHERE id = $2 RETURNING *;";
    const values = [estado, id];
    const result = await pool.query(query, values);

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      return {
        status: "Error",
        message: "No se pudo editar el estado del usuario",
        code: 500,
      };
    } else {
      /* Success */
      /* Termina la transacción */
      await pool.query("COMMIT");
      return {
        status: "Success",
        message: "Estado Editado Correctamente",
        code: 200,
        edit: result.rows,
      };
    }
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Fallo al editar estado",
    };
  }
};

module.exports = { loginAdmin, getUsersAdmin, updateState };
