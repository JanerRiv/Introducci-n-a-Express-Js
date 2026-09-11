
const { error } = require('console');
const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PUERTO || 3030
const jwt =require("jsonwebtoken")
//importacion de modulo
const registro = require('./middleware/registroMiddleware.js')
const manejoerror = require ('./middleware/manejadorErrores.js')
const autenticacion = require('./middleware/autenticacion.js')




// middleware para parseas datos del body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middleware propios
//este middleware se ejecuta simpre que se ha una peticion sea (GET,POST,PUT-PATCH O DELETE)
app.use((req,res,next)=>{
    console.log(`Tiempo en milisegundos:${Date.now()}`)
    console.log(`Fecha:${new Date().toISOString()}`)
    next()

})

//usar el historial peticiones
app.use(registro)
//usar para el manejo de errores

//leer archivo

const sistemaActivo = require("fs");
const ruta =require("path");
const { json } = require('stream/consumers');
const rutaArchivo = ruta.join(__dirname,"datos.json")
//libreria para subir archivos

const multer = require("multer")

//configurar almacenamiento de archivos

const almacenamiento = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "misImagenes/" )
    },
    filename: (req,file,cb)=>{
        const extension = ruta.extname (file.originalname)
        cb(null, `${Date.now}${extension}`)
    }
})

const cargar = multer ({storage: almacenamiento })


app.get("/", (req, res) => {
res.send('Aprendicez ficha 3407186');
});



app.get("/api/aprendices", (req,res) => {
    //leer archivo json
    sistemaActivo.readFile(rutaArchivo,"utf-8",(error,datos)=> {
        if (error) { 
            return res.status(500).json({Error : "Error al leer el archivo o BD"})
        }
        const listaAprendices = JSON.parse(datos)
        res.status(200).json({
        'mensaje':listaAprendices})


    })
})

app.get("/api/aprendices/:id", (req,res) => {
    res.json(200)({
        'mensaje':'Listar aprendiz'
    })
})
 

app.post("/api/aprendices", cargar.single("imagen"),(req,res) => {
    //Validar datos 



    const datosAprendiz = req.body
    //agregar la ruta de la imagen

    datosAprendiz.imagen = req.file? `/misImagenes/${req.file.filename}` :"sin imagen"
    
    //leer archivo
    sistemaActivo.readFile(rutaArchivo,"utf-8",(error,datos)=> {
        if (error) { 
            return res.status(500).json({Error : "Error al leer el archivo o BD"})
        }
        const listaAprendices = JSON.parse(datos)
        listaAprendices.push(datosAprendiz)

        //acondicionar el nuevo aprendiz a la lista 
        sistemaActivo.writeFile(rutaArchivo, JSON.stringify(listaAprendices, null, 2),(error)=> {
            if(error){
            return res.status(500).json({Error : "No se puede escribir en el archivo o DB"})  
            }
            res.status(200).json({'mensaje':"Aprendiz creado","Datos aprendiz": datosAprendiz})
        }) 
    })
})

app.put("/api/aprendices/:id", (req,res) => {
    res.status(200).json({
        'mensaje':'editar aprendices'
    })
})

app.delete("/api/aprendices/:id", (req,res) => {
    res.status(200).json({
        'mensaje':'eliminar aprendices'
    })
})


//Error provocado
app.get("/error",(req,res,next)=>{
    next(new Error("Error intencional de mi app"))

})

//ruta proyegida
app.get("/api/rutaprotegida",autenticacion,(req,res,) =>{
    res.header
})

//login, inisio de sesion
app.post("/api/login", (req, res) => {
    // Simular datos de la BD 
    const usuarioBd = {
        "usuario": "janer",
        "clave": "abc123"
    };
    
   
    const { usuario, clave } = req.body || {};
    
    // Validar datos 
    if (!usuario || !clave || usuario !== usuarioBd.usuario || clave !== usuarioBd.clave) {
       
        return res.status(400).json({ mensaje: "Credenciales no válidas, usuario o clave incorrectos" });
    }
    
    // Crear una variable para almacenar el token 
    const token = jwt.sign(
        
        { "usuario": usuario },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    
    
    res.json({ token });
});

app.use(manejoerror)

app.listen(port, () => {
console.log( `SERVIDOR: http://localhost:${port}`);
});

