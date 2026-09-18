const jwt = require("jsonwebtoken");


const autenticacion = (req, res, next) => {
    
    
    const token = req.header("autenticar")?.split(" ")[1];
    
    
    if (!token) {
        return res.status(401).json({ Error: "Acceso denegado, no provee token." });
    }

    
    jwt.verify(token, process.env.JWT_SECRET, (error, usuario) => {
        if (error) {
            
            return res.status(403).json({ Error: "Token inválido." });
        }
        
        
        req.usuario = usuario;
        
        
        next();
    });
};

module.exports = autenticacion;