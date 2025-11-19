const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");
const Cliente = require("../models/Cliente");
const Producto = require("../models/Producto");

router.get("/promedios", async (req, res) => {
  try {
    
    const ventas = await Venta.findAll();

    const ventasPorDia = {};

    ventas.forEach(v => {
        const dia = v.fecha.toISOString().slice(0, 10);
        if (!ventasPorDia[dia]) ventasPorDia[dia] = [];
        ventasPorDia[dia].push(v.total);
    });

    const promediosPorDia = Object.entries(ventasPorDia).map(([dia, totales]) => ({
        dia,
        promedio: totales.reduce((a, b) => a + Number(b), 0) / totales.length
    }));


    const productos = await Producto.findAll({ include: Venta });

    const promediosPorProducto = productos.map(p => ({
        producto: p.nombre,
        promedio: p.ventas.length
        ? p.ventas.reduce((acc, v) => acc + Number(v.total), 0) / p.ventas.length
        : 0
    }));

    
    const clientes = await Cliente.findAll({ include: Venta });

    const promediosPorCliente = clientes.map(c => ({
        cliente: c.nombre + " " + c.apellido,
        promedio: c.ventas.length
        ? c.ventas.reduce((acc, v) => acc + Number(v.total), 0) / c.ventas.length
        : 0
    }));

    res.json({
        promediosPorDia,
        promediosPorProducto,
        promediosPorCliente
    });

} catch (e) {
    res.status(500).json({ error: e.message });
}
});

function desvioEstandar(arr){
    const media=arr.reduce((a,b)=> a+b,0)/arr.length;
    const variancia=arr.reduce((a,b)=>a+b(b-media)**2,0)/arr.length;
    return Math.sqrt(variancia);
}

function desvioEstandar(arr) {
  const media = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variancia = arr.reduce((a, b) => a + (b - media) ** 2, 0) / arr.length;
  return Math.sqrt(variancia);
}

router.get("/desvio", async (req, res) => {
  try {
    const ventas = await Venta.findAll();

    const totales = ventas.map(v => Number(v.total));

    const desvio = desvioEstandar(totales);

    res.json({ desvio });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


function correlacion(x, y) {
  const n = x.length;
  const mediaX = x.reduce((a, b) => a + b, 0) / n;
  const mediaY = y.reduce((a, b) => a + b, 0) / n;

  let num = 0, den1 = 0, den2 = 0;

  for (let i = 0; i < n; i++) {
    num += (x[i] - mediaX) * (y[i] - mediaY);
    den1 += (x[i] - mediaX) ** 2;
    den2 += (y[i] - mediaY) ** 2;
  }

  return num / Math.sqrt(den1 * den2);
}

router.get("/correlacion", async (req, res) => {
  try {
    const ventas = await Venta.findAll({ include: Producto });

    const precios = ventas.map(v => Number(v.producto.precio_unitario));
    const cantidades = ventas.map(v => Number(v.cantidad));

    const correlacionPrecioCantidad = correlacion(precios, cantidades);

    res.json({
      correlacionPrecioCantidad
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;