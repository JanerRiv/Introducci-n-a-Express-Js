const {Router} = require("express")
const enrutador = Router()
const listarUsuariosController = require('../controllers/listarUsuariosController')


//funcion (req,res) debe ir en el controlador 
enrutador.get("/rutaUsuarios",listarUsuariosController)

module.exports = enrutador