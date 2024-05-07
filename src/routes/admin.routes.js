const { Router } = require("express");
const router = Router();
const {
  getUsersAdmin,
  updateState,
  loginAdmin,
} = require("../controllers/admin.controller.js");
const jwt = require("jsonwebtoken");
/* JWT Config */
const secretKey = "Mi Llave Ultra Secreta de Admin";
const tokenOptions = { expiresIn: "360s" };

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query;
    const loggedAdmin = await loginAdmin(email, password);
    console.log(loggedAdmin);
    const selectedUser = {
      email,
      password,
    };
    if (loggedAdmin.status === "Success") {
      const token = jwt.sign(selectedUser, secretKey, tokenOptions);

      res.status(200).json({
        status: "Ok",
        is_Admin: true,
        message: "Administrador logueado",
        token: token,
        loginAdmin: loggedAdmin,
      });
    } else {
      res.status(204).json({
        message:
          "El usuario y/o la contraseña no son correctos. Vuelve a intentarlo",
      });
    }
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const { token } = req.query;
    const obtenerUsers = await getUsersAdmin();
    return jwt.verify(token, secretKey, (err, data) => {
      err
        ? res.status(204).json({
            status: "Error",
            message: "No se pudo obtener el listado de Skaters",
            error: err,
          })
        : res.status(200).send({
            status: "OK",
            is_Admin: true,
            message: "Listado de Skaters encontrado",
            datos: obtenerUsers,
          });
    });
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const { estado, id, token } = req.body;
    const editState = await updateState(estado, id);
     return jwt.verify(token, secretKey, (err, data) => {
       err
         ? res.status(204).json({
             status: "Error",
             message: "Error al editar Estado",
             error: err,
           })
         : res.status(200).send({
             status: "OK",
             is_Admin: true,
             message: "Estado Actualizado",
             datos: editState,
           });
     });
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
