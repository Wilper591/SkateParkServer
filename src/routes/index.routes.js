const { Router } = require("express");
const router = Router();
const rutasRegistro = require("./registro.routes.js");
const rutasLogin = require("./login.routes.js");
const rutasDatos = require("./datos.routes.js");
const rutasIndex = require("./main.routes.js");
const rutasAdmin = require("./admin.routes.js");

//Rutas
router.use("/main", rutasIndex);
router.use("/login", rutasLogin);
router.use("/registro", rutasRegistro);
router.use("/datos", rutasDatos);
router.use("/admin", rutasAdmin);

module.exports = router;
