const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const ventasRouter = require("./routes/ventas");
const estadisticasRouter = require("./routes/estadisticas");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/ventas", ventasRouter);
app.use("/estadisticas", estadisticasRouter);

db.sync().then(() => console.log("DB Conectada "));

app.listen(3000, () => console.log("API corriendo en http://localhost:3000"));