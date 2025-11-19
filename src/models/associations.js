const Cliente = require("./Cliente");
const Producto = require("./Producto");
const Venta = require("./Venta");

// Cliente → Venta
Cliente.hasMany(Venta, { foreignKey: "clienteId" });
Venta.belongsTo(Cliente, { foreignKey: "clienteId" });

// Producto → Venta
Producto.hasMany(Venta, { foreignKey: "productoId" });
Venta.belongsTo(Producto, { foreignKey: "productoId" });

module.exports = { Cliente, Producto, Venta };