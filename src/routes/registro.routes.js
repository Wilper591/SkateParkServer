const { Router } = require("express");
const router = Router();
const { createUser } = require("../controllers/registro.controller.js");
const path = require("path");
const rutaRaiz = path.join( __dirname, "../..")

router.post("/", async (req, res) => {
  try {
    const { email, nombre, password, anos_experiencia, especialidad } =
      req.body;
    const foto = req.files.foto;
    const { name } = foto;
    let date = new Date();
    let time = date.getTime();
    let newFileName = `${time}-${name}`;
    foto.mv(`${rutaRaiz}/data/${newFileName}`, async (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al cargar la foto: " + err);
      } else {
        try {
          const nuevoRegistro = await createUser(
            email,
            nombre,
            password,
            anos_experiencia,
            especialidad,
            newFileName
          );
          res.status(200).send(nuevoRegistro);
        } catch (error) {
          console.error("Hubo un error", error.message);
          res.status(500).send(error.message);
        }
      }
    });
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
