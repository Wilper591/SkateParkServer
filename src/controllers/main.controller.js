const { pool } = require("../db.js");

const getUsers = async () => {
  try {
    const query = "SELECT nombre, anos_experiencia, especialidad, foto, estado FROM skaters ORDER BY id ASC;"
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
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Error al obtener usuarios fallido",
    };
  }
};

module.exports = getUsers;