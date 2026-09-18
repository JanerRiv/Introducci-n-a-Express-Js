const {Router} = require("express")
const enrutador = Router()

//funcion (req,res) debe ir en el controlador 
enrutador.get("/rutaUsuarios",(req,res)=>{
    res.json({mensaje:"es mi rutaUsuario"})
})

module.exports = enrutador