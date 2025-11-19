const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Cliente = require("./Cliente");
const Producto = require("./Producto");

const Venta = db.define("venta", {
  fecha: DataTypes.DATEONLY,
  cantidad: DataTypes.INTEGER,
  metodo_pago: DataTypes.STRING,
  total: DataTypes.DECIMAL
});

Cliente.hasMany(Venta);
Venta.belongsTo(Cliente);
Producto.hasMany(Venta);
Venta.belongsTo(Producto);

module.exports = Venta;