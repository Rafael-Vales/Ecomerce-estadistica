const express = require("express");
const Producto = require("../models/Producto");
const router = express.Router();

// Crear producto
router.post("/", async (req, res) => {
try {
    const producto = await Producto.create(req.body);
    res.json(producto);
} catch (e) {
    res.status(500).json({ error: e.message });
}
});

// Listar productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Obtener producto por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;