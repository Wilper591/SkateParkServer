const { pool } = require("../db.js");

const loginUser = async (email, password) => {
  try {
    const text =
      "SELECT id, email, password FROM skaters WHERE email = $1 AND password = $2;";
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

module.exports = { loginUser };
