const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Producto = db.define("producto", {
  nombre: DataTypes.STRING,
  categoria: DataTypes.STRING,
  precio_unitario: DataTypes.INTEGER,
  stock: DataTypes.INTEGER
}, {
  timestamps: false
});

module.exports = Producto;