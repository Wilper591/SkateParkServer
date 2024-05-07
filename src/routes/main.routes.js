const { Router } = require("express");
const router = Router();
const getUsers = require("../controllers/main.controller.js");
router.get("/", async (req, res) => {
  try {
    const obtenerUsers = await getUsers();
    res.status(200).json(obtenerUsers);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
