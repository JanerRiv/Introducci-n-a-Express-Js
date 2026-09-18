const manejadorErrores = (error, req, res, next) => {
    const fecha = new Date().toISOString();
    
    // Corrección 1: El parámetro 'error' ahora está definido en la función
    // Corrección 2: 'statusCode' con C mayúscula
    const codigoEstado = error.statusCode || 500;
    
    // Corrección 3: 'message' escrito correctamente
    const mensaje = error.message || "Error inesperado !!";
    
    console.error(`[ERROR] - ${fecha} - ${codigoEstado} - ${mensaje}`);
    
    // Validar si hay más información
    if (error.stack) {
        console.error(error.stack);
    }
    
    // Respuesta en JSON
    res.json({
        error: "ERROR",
        codigoEstado, 
        mensaje,
        // Dependiendo si estamos en desarrollo o producción
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    });
    next ()
};

module.exports = manejadorErrores;