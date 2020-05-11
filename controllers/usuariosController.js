const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req,res) => {

    const {email,password} = req.body;

    try {
        //compurebo si el usuario existe
        let usuario = await Usuarios.findOne({email});
        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //instanciando el usuario
        usuario = new Usuarios(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt)

        //almaceno el usuario en la DB
        await usuario.save();

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