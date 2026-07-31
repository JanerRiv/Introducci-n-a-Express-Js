import express from 'express';

import "dotenv/config";

const app = express();
const port = process.env.PUERTO || 3000;

app.get("/", (_, res) => {
res.send('Aprendicez ficha 3407186 SENA');
});
//Ejercicios

// 1. Parámetro simple único
app.get("/saludo/:nombre", (req, res) => {
    const nombre = req.params.nombre;

    if (nombre.length < 3) {
        return res.status(400).send("El nombre es muy corto");
    }

    res.send(`Hola ${nombre}, bienvenido`);
});

// 2. Producto
app.get("/productos/:nombre", (req, res) => {
    const nombre = req.params;
    const producto= {
        id: 1,
        nombre: nombre,
        stock: 10,
        precio: 50000,
        categoria: "Tecnología"
    };
    res.json(producto);
});


//3. multiples parametros en la ruta 

app.get("/productos/:categoria/:id", (req, res) => {
    const {categoria,id} = req.params;
    
    res.json({
        "servidor":"servidor express",
        "categoria":categoria,
        producto: id 
    });
});


app.listen(port, () => {
console.log( `Servidor en funcionamiento en el puerto: http://localhost:${port}`);
});

