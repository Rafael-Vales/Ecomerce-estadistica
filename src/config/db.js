const { Sequelize } = require("sequelize");

const db = new Sequelize("ecommerce_stats", "root", "123456789", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log  
});

module.exports = db;