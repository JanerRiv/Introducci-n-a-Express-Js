const { error } = require('console');
const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;

//leer archivo

const sistemaActivo = require("fs");
const ruta =require("path");
const { json } = require('stream/consumers');
const rutaArchivo = ruta.join(__dirname,"datos.json")


app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
 

app.post("/api/aprendices", (req,res) => {
    const datosAprendiz = req.body
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

app.post("/rutajson", (req,res) => {
    const todosDatos = req.body
    const edad = todosDatos.edad
    if (edad >= 18) {res.json({mensaje:"es mayor"})
    }else {
        res.json({mensaje:"es menor"})
    }
        
})

app.post("/rutaFormulario", (req,res) => {
    const formulario = req.body
    const programa = req.body.programa

    res.json({formulario: formulario, My_programa: programa})
        
})

app.listen(port, () => {
console.log( `SERVIDOR: http://localhost:${port}`);
});