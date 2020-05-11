const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventosSchema = new Schema ({
    creador: {
        type:Schema.ObjectId,
        ref:'Usuarios'
    },
    nombre: {
        type: String,
        required:true
    },
    ubicacion: {
        type: String,
        require:true
    },
    fecha: {
        type:Date
    }
})

module.exports = mongoose.model('Eventos',eventosSchema);