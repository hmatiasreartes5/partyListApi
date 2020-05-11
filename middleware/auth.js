const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //Leer el token del header
    const token = req.header('x-auth-token');
    
    //Revisar si existe el token
    if(!token){
        res.status(401).json({msg:'No hay token,permiso no valido'});
    }

    //validar el token
    try {
        const cifrado = jwt.verify(token,'poche555');
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'});
    }
}