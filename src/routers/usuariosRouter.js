const {Router} = require("express")
const enrutador = Router()
const {mostrarUsuarios, registrarController, loginController} = require('../controllers/listarUsuariosController')


//funcion (req,res) debe ir en el controlador 
enrutador.get ("/listado", mostrarUsuarios)
enrutador.get ("/registrar",registrarController)
enrutador.get ("/login",loginController)


module.exports = enrutador