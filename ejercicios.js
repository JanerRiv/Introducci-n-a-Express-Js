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





//4 Parametros combinados con Query 

app.get ("/usuarios/:id/posts", (req,res) => {
    
        const id = req.params.id;
        const orden = req.query.orden;

    res.json({
        usuario:id,
        orden:orden,
        publicaciones: [
            "Primera publicacion",
            "segunda publicacion",
            "tercera publicacion"
        ]
    });
});


// 5. Parámetros combinados con Query

app.get("/usuarios/:id/:posts_id/comentarios", (req, res) => {

    const id = req.params.id;
    const posts_id = req.params.posts_id;
    const orden = req.query.orden;

    res.json({
        usuario: id,
        post: posts_id,
        orden: orden,
        comentarios: [
            "Primer comentario",
            "Segundo comentario",
            "Tercer comentario"
        ]
    });

});

// 6. Validación y manejo de recursos no encontrados

const libros = [
    {
        isbn: "123",
        nombre: "Noches Blancas"
    },
    {
        isbn: "456",
        nombre: "Divina Comedia"
    },
    {
        isbn: "789",
        nombre: "Cartas al Padre"
    }
];

app.get("/libros/:isbn", (req, res) => {

    const isbn = req.params.isbn;

    const libro = libros.find(libro => libro.isbn === isbn);

    if (!libro) {
        return res.status(404).send("Libro no encontrado");
    }

    res.json(libro);

});

app.listen(port, () => {
console.log( `Servidor en funcionamiento en el puerto: http://localhost:${port}`);});