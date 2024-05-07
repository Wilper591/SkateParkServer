const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const secretKey = "Mi Llave Ultra Secreta";
const {
  getDatos,
  updateDatos,
  deleteDatos,
} = require("../controllers/datos.controller.js");

router.get("/", async (req, res) => {
  try {
    const { id, token } = req.query;
    const getData = await getDatos(id);

    return jwt.verify(token, secretKey, (err, data) => {
      err
        ? res.status(204).json({
            status: "Error",
            message: "Usuario no encontrado",
            error: err,
          })
        : res.status(200).send({
            status: "OK",
            is_Active: true,
            message: "Usuario logueado",
            datos: getData,
          });
    });
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const { token } = req.query;
    const { nombre, password, anos_experiencia, especialidad, id } = req.body;
    try {
      const decode = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(204).json({
        status: "Error",
        message: "No se actualizaron los datos",
        error: error,
      });
    }
    const editUser = await updateDatos(nombre, password, anos_experiencia, especialidad, id);
    res.status(200).send({
            status: "OK",
            is_Active: true,
            message: "Datos actualizados Exitosamente",
            datos: editUser,
          });
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { token, id } = req.query;
    try {
      const decode = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(204).json({
        status: "Error",
        message: "No se pudo eliminar la cuenta",
        error: error.message,
      });
    }
    const eraseUser = await deleteDatos(id);
    res.status(200).json({
      status: "OK",
      is_Active: false,
      message: "Cuenta eliminada",
      datos: eraseUser,
    });
  } catch (error) {
    console.error("Hubo un error", error.message);
    console.error("Hubo un error", error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
