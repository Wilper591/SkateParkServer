const { Router } = require("express");
const router = Router();

const {
  getDatos,
  updateDatos,
  deleteDatos,
} = require("../controllers/datos.controller.js");

router.get("/", async (req, res) => {
  try {
    const { id, token } = req.query;
    const getData = await getDatos(id, token);
console.log(getData);
    if (getData.status === "Error") {
      res.status(204).json({
        status: "Error",
        message: "Usuario no encontrado",
        error: getData.message,
      });
    } else {
      res.status(200).send({
        status: "OK",
        is_Active: true,
        message: "Usuario logueado",
        datos: getData,
      });
    }
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const { token } = req.query;
    const { nombre, password, anos_experiencia, especialidad, id } = req.body;
    const editUser = await updateDatos(nombre, password, anos_experiencia, especialidad, id, token);

    if (editUser.status === "Error") {
      res.status(204).json({
        status: "Error",
        message: "Datos no actualizados",
        error: editUser.message,
      });
    } else {
      res.status(200).send({
        status: "OK",
        is_Active: true,
        message: "Datos actualizados exitosamente!",
        datos: editUser,
      });
    }
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { token, id } = req.query;
    const eraseUser = await deleteDatos(id, token);

    if (eraseUser.status === "Error") {
      res.status(204).json({
        status: "Error",
        message: "No se pudo eliminar tu cuenta!",
        error: eraseUser.message,
      });
    } else {
      res.status(200).send({
        status: "OK",
        is_Active: true,
        message: "Cuenta Eliminada Exitosamente",
        datos: eraseUser,
      });
    }
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
