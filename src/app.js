const express = require("express");
const expressFileUpload = require("express-fileupload");
const rutas = require("./routes/index.routes.js");
const cors = require("cors");
const app = express();
const PORT = 3000;

//Middlewares
let filesConfig = {
  limits: { fileSize: 10000000 }, //tamaño en bytes =>  1kb => 1024bytes
  abortOnLimit: true, //Si se pasa de 5MB responde con el error de abajo ↓
  responseOnLimit:
    "El peso del archivo que intentas subir supera el limite permitido.",
};
let corsOptions = {
  origin: "*"
};

app.use(express.static("data"));
app.use(expressFileUpload(filesConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

//Rutas
app.use("/apiV1", rutas);

//Ruta Genérica
app.get("*", (req, res) => {
  try {
    res
      .status(404)
      .send(`<a href="https://wilper591.github.io/SkateParkClient/">SkatePark</a>`);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

module.exports = { app, PORT };
