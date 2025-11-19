const {DataTypes}=require("sequelize");
const db=require("../config/db");

const Cliente=db.define("cliente",{
  nombre: DataTypes.STRING,
  apellido:DataTypes.STRING,
  email:DataTypes.STRING,
  ciudad: DataTypes.STRING,
  edad: DataTypes.INTEGER
});

module.exports=Cliente