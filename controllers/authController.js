const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.autenricarUsuario = async (req,res) => {

    const {email,password} = req.body

    try {
        let usuario = await Usuarios.findOne({email});
        
        //verifico si el usuario no existe
        if(!usuario){
            return res.status(400).json({msg : 'Ese usuario no existe'});
        }

        //si el usuario existe verifico si la contraseña es la correcta
        let passwordCorrecta = await bcryptjs.compare(password,usuario.password);
        if(!passwordCorrecta){
            res.status(400).json({msg: 'Password incorrecto'});
        }

        //Crear y firmar JWT
        //Crear JWT
        const payload = {
            usuario: {
                id : usuario.id
            }
        }

        //firmar el JWT
        jwt.sign(payload,'poche555',{
            expiresIn : 3600
        },(error,token)=>{
            if(error) throw error;
            //Mensaje de confirmacion
            res.json({token});
        });


    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}