import express from 'express';

import "dotenv/config";

const app = express();
const port = process.env.PUERTO || 3000;

app.get("/", (_, res) => {
res.send('Aprendicez ficha 3407186 SENA');
});

app.get("/ruta1", (req,res)=> {
    //temploate string
    res.send(`<h1>usando res.send </h1>`)
})

app.get("/ruta2", (req,res)=> {
    //temploate string
    res.json({
        "dev":"node --watch app.js",
        "start":"node app.js"
    })
})

app.get("/ruta3/:nombre/:apellido", (req,res)=> {
    let nameUsuario = req.params.nombre
    let lastUsuario = req.params.apellido
    res.json({"usuario": nameUsuario,
            "apellido":lastUsuario
    })
})


//ruta con parametros de consulta query
app.get("/ruta4", (req,res)=> {
    const numero = req.query.phone 
    const orden = req.query.orden || "sin orden"
    const pagina = req.query.pagina || 1
    res.send(`<h1>Listado aprendices</h1>
        <h2>El listado en orden ${orden}</h2>
        <p>Pagina: ${pagina}</p>
        <h3>Numero: ${numero}</h3> 
        `)
})

app.listen(port, () => {
console.log( `Servidor en funcionamiento en el puerto: http://localhost:${port}`);
});

