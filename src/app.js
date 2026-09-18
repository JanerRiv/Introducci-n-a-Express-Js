require('dotenv').config()
const express =require("express")

//importar enrutador
const enrutador = require('./routers')

const app = express()

//usar middleware ,formaterar el body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//importar el enrutador (todas las rutas)
app.use("/api", enrutador)


//endpoint raiz, bienvenida
app.get("/",(req,res)=>{
    res.send("API,REST estructurado en capas")
});

module.exports = app