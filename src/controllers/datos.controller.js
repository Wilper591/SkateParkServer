const { pool } = require("../db.js");
const fs = require("fs");
const path = require("path");
const rutaRaiz = path.join(__dirname, "../..");
const jwt = require("jsonwebtoken");
const secretKey = "Mi Llave Ultra Secreta";

const getDatos = async (id, token) => {
  try {
    jwt.verify(token, secretKey);
    const query =
      "SELECT email, nombre, password, anos_experiencia, especialidad FROM skaters WHERE id = $1;";
    const values = [id];
    const result = await pool.query(query, values);

    if (!result.rowCount) {
      return {
        status: "Error",
        message: "No se pudo obtener los datos",
        code: 500,
      };
    } else {
      return {
        status: "Success",
        message: "Datos obtenidos con éxito",
        code: 200,
        result: result.rows,
      };
    }
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Consulta de datos fallida",
    };
  }
};

const updateDatos = async (
  nombre,
  password,
  anos_experiencia,
  especialidad,
  id,
  token
) => {
  try {
    jwt.verify(token, secretKey);
    await pool.query("BEGIN");
    const query =
      "UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE id = $5 RETURNING *;";
    const values = [nombre, password, anos_experiencia, especialidad, id];
    const result = await pool.query(query, values);

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      return {
        status: "Error",
        message: "No se pudo editar la información del usuario",
        code: 500,
      };
    } else {
      /* Termina la transacción */
      /* Success */
      await pool.query("COMMIT");
      return {
        status: "Success",
        message: "Usuario Editado Correctamente",
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
      mensajeDelProgramador: "Actualización de datos fallida",
    };
  }
};

const deleteDatos = async (id, token) => {
  try {
    jwt.verify(token, secretKey);
    await pool.query("BEGIN");
    const query = "DELETE FROM skaters WHERE id = $1 RETURNING *;";
    const values = [id];
    const result = await pool.query(query, values);
    /* Elimina la foto desde data */
    let fotoName = result.rows[0].foto.replace(
      /^https:\/\/skateparkserver.onrender.com\//,
      ""
    );
    fs.unlink(`${rutaRaiz}/data/${fotoName}`, (err) => {
      if (err) {
        console.error("Hubo un error al eliminar el archivo:", err);
      } else {
        console.log("Archivo eliminado correctamente");
      }
    });

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      return {
        status: "Error",
        message: "No se pudo eliminar el usuario",
        code: 500,
      };
    } else {
      /* Success */
      /* Termina la transacción */
      await pool.query("COMMIT");
      return {
        status: "Success",
        message: "Usuario Eliminado Correctamente",
        code: 200,
        erased: result.rows,
      };
    }
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Eliminacion de usuario fallida",
    };
  }
};
module.exports = { getDatos, updateDatos, deleteDatos };
