const express = require("express");
const Cliente = require("../models/Cliente");
const router = express.Router();

// Crear cliente
router.post("/", async (req, res) => {
  try {
    console.log("Body recibido por backend:", req.body);

    const cliente = await Cliente.create(req.body);
    res.json(cliente);

  } catch (e) {
    console.error("ERROR AL CREAR CLIENTE:", e);   
    res.status(500).json({ error: e.message });
  }
});

// Listar clientes
router.get("/", async (req, res) => {
try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
} catch (e) {
    res.status(500).json({ error: e.message });
}
});

module.exports = router;