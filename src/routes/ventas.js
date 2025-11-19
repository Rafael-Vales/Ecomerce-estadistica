const express=require("express");
const venta= require("../models/Venta")
const Cliente = require("../models/Cliente");
const Producto = require("../models/Producto");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
    const venta = await Venta.create(req.body);
    res.json(venta);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});


router.get("/", async (req,res)=>{
    try{
        const ventas=await venta.findAll({
        include:[
            {model: Cliente,attributes:["nombre","apellido","ciudad"]},
            {model: Producto, attributes: ["nombre","categoria","precio_unitario"]}
        ],
        order:[["fecha","DESC"]]
    });
    res,json(ventas);
    }catch (err){
        res.status(500).json({error: err.message});
    }

})

module.exports = router;