const listarUsuarios = require("../services/usuariosServices.js")
const mostrarUsuarios = async(req,res)=>{
    try{
        const usuarios = await listarUsuarios() 
        res.json(usuarios)
    }catch(error){
        res.status(500).json({mensaje:"Error al comunicarse con la base de datos", Error: error.mensage})
    }
    res.json({mensaje:"Estos son los usuarios"})
}

//ruta registrarse
const registrarController = async(req,res)=>{
    res.json({mensaje:"ruta para registrarme"})
}

//ruta login 
const loginController = async(req,res)=>{
    res.json({mensaje:"ruta para logearme"})
}

module.exports = {mostrarUsuarios,registrarController,loginController}