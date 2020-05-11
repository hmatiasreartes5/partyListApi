const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistentesSchema = new Schema({
    evento: {
        type:Schema.ObjectId,
        ref:'Eventos'
    },
    nombre:{
        type: String,
        required: true
    },
    dni: {
        type:String,
        trim:true,
        required:true
    },
    estado: {
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('Asisitentes', asistentesSchema);