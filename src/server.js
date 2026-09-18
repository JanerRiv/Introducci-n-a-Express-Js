// importar mi aplicacion 
const app = require('./app')

//verificar el puerto del entrono virtual 

const PUERTO = process.env.PUERTO || 3333

//imprimo por consola el link del servidor 

app.listen(PUERTO,()=>{
    console.log(`MI SERVIDOR: http://localhost:${PUERTO}`)
})
