const Eventos = require('../models/Eventos');

//Creando el evento
exports.crearEvento = async (req,res) => {

    //instanciamos un evento
    const evento = new Eventos(req.body);
    try {
        //Agregamos el id del creado mediante JWT
        evento.creador = req.usuario.id;

        //almacenamos el evento en la DB
        await evento.save()
        res.json({evento});
    } catch (error) {
        console.log(error);
        res.status(500).send('Se produjo un error al intentar guardar el evento');
    }
}

exports.obtenerEvento = async (req,res) => {
    try {
        //realiza el query a la DB
        const evento = await Eventos.find({creador: req.usuario.id});
        res.status(200).json({evento});
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error al buscar los eventos pertenecientes a este usuario');
    }
}

exports.updateEvento = async (req,res) => {
    //obtengo los nuevos datos a traves de LA SOLICITUD (REQUEST)
    const nuevoEvento= req.body 

    try {

        //busco el evento
        let evento = await Eventos.findById(req.params.idEvento);

        //verifico si el evento existe
        if(!evento){
            return res.status(404).json({msg: 'Evento no encontrado'});
        }

        //si el evento existe verifico que el dueño del evento sea el correcto
        if(evento.creador.toString() !== req.usuario.id){
            return res.status(404).json({msg : 'Usuario no autorizado'})
        }

        //actualizar
        evento = await Eventos.findOneAndUpdate({
            _id: req.params.idEvento
        },
            nuevoEvento,
        {   new : true
        });

        res.status(200).json({msg: 'Evento Actuzalizado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al intentar actualizar el evento');
    }
}

exports.deleteEvento = async (req,res) => {
    try {
        //busco el evento
        let evento = await Eventos.findById(req.params.idEvento);

        //verifico que el evento exista
        if(!evento){
            return res.status(404).json({msg: 'Evento no encontrado'});
        }

        //si el evento existe verifico que el dueño del evento sea el correcto
        if(evento.creador.toString() !== req.usuario.id){
            return res.status(404).json({msg : 'Usuario no autorizado'})
        }

        //elimino el evento por medio de su id
        await Eventos.findOneAndRemove({_id : req.params.idEvento});
        res.status(200).json({msg: 'Evento Eliminado Correctamente'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al intentar eliminar el evento');
    }
} 
