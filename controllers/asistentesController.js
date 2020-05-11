const Eventos = require('../models/Eventos');
const Asistentes = require('../models/Asistentes');

exports.guardarAsistente = async (req,res) => {

    //extraigo el evento
    const {evento} = req.body

    try {
        //busco el evento
        const event = await Eventos.findById(evento);

        //verifico si existe el evento
        if(!event){
            return res.status(404).json({msg: 'El evento no existe'});
        }

        //verificar si el evento actual pertenece al usuario logueado
        if(event.creador.toString() !== req.usuario.id){
            return res.status(404).json({msg: 'Usuario no autorizado'});
        }

        //realizamos un instancia del asistente
        const asistente = new Asistentes(req.body);

        //almaceno en la DB
        await asistente.save();
        res.status(200).json({msg: 'Asistente Guardado'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al almacenar el asistente');
    }
}


exports.listarAsistentes = async(req,res) => {
     //extraigo el evento
     const {evento} = req.body

     try {
        //busco el evento
        const event = await Eventos.findById(evento);

        //verifico si existe el evento
        if(!event){
            return res.status(404).json({msg: 'El evento no existe'});
        }

        //verificar si el evento actual pertenece al usuario logueado
        if(event.creador.toString() !== req.usuario.id){
            return res.status(404).json({msg: 'Usuario no autorizado'});
        }

        //obtengo los asistentes de ese evento
        const asistentes = await Asistentes.find({evento});
        res.status(200).json({asistentes});
     } catch (error) {
         console.log(error);
         res.status(500).send('Error al buscar los asistentes del evento');
     }
}


exports.updateAsistente = async (req,res) => {
    const {evento} = req.body;
    const nuevoAsistente = req.body;

    try {
        //busco el asistente
        let asistente = await Asistentes.findById(req.params.idAsistente);

        //verifico si existe ese asistente
        if(!asistente){
            return res.status(404).json({msg: 'El asistente no existe'});
        }

        //busco el evento
        const event = await Eventos.findById(evento);

        //verifico si existe el evento
        if(!event){
            return res.status(404).json({msg: 'El evento no existe'});
        }

        //verificar si el evento actual pertenece al usuario logueado
        if(event.creador.toString() !== req.usuario.id){
            return res.status(404).json({msg: 'Usuario no autorizado'});
        }

        //actualizo los datos del asistente
        asistente =  await Asistentes.findOneAndUpdate({
            _id: req.params.idAsistente
        },
            nuevoAsistente,
        {
            new: true
        })

        res.status(200).json({msg: 'Datos modificados'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar los datos del asistente');
    }
}


exports.deleteAsistente = async (req,res) =>{
    //extraigo datos
    const {evento} = req.body;
    try {
         //busco el asistente
         let asistente = await Asistentes.findById(req.params.idAsistente);

         //verifico si existe ese asistente
         if(!asistente){
             return res.status(404).json({msg: 'El asistente no existe'});
         }
 
         //busco el evento
         const event = await Eventos.findById(evento);
 
         //verifico si existe el evento
         if(!event){
             return res.status(404).json({msg: 'El evento no existe'});
         }
 
         //verificar si el evento actual pertenece al usuario logueado
         if(event.creador.toString() !== req.usuario.id){
             return res.status(404).json({msg: 'Usuario no autorizado'});
         }
 
         //elimino el asistente por medio de su id
         await Asistentes.findOneAndRemove({_id: req.params.idAsistente});
         res.status(200).json({msg : 'Eliminado Correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al borrar los datos');
    }
}