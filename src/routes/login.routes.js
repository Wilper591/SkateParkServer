const { Router } = require("express");
const router = Router();
const { loginUser } = require("../controllers/login.controller.js");
const jwt = require("jsonwebtoken");
/* JWT Config */
const secretKey = "Mi Llave Ultra Secreta";
const tokenOptions = { expiresIn: "360s" };

router.get("/", async (req, res) => {
  try {
    const { email, password } = req.query;
    const loggedUser = await loginUser(email, password);
    const selectedUser = {
      email,
      password,
      id: String(loggedUser.result.map(data=>data.id))
    };
    console.log(selectedUser);
    if (loggedUser.status === "Success") {
      const token = jwt.sign(selectedUser, secretKey, tokenOptions);
      
      res.status(200).json({
        status: "Ok",
        is_Active: true,
        message: "Usuario logueado",
        token: token,
        loginData: loggedUser,
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

module.exports = router;