const express = require('express');
const router = express.Router();

/**Controladores */
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const eventosController = require('../controllers/eventosController');
const asistentesController = require('../controllers/asistentesController');

const auth = require('../middleware/auth');
 
module.exports = function (){

    /**SECCION USUARIOS */
    /* Crear Usuarios */
    router.post('/usuarios',
        usuariosController.crearUsuario
    );

    /* Iniciar Sesion */
    router.post('/iniciar-sesion',
        authController.autenricarUsuario
    );

    /**SECCION EVENTOS */
    /* Crear Evento */
    router.post('/eventos',
        auth,
        eventosController.crearEvento
    );

    /* Listar Eventos del Usuario */
    router.get('/eventos',
        auth,
        eventosController.obtenerEvento
    )

    /* Actualizar datos de un evento */
    router.put('/eventos/:idEvento',
        auth,
        eventosController.updateEvento
    )

    /* Eliminar un evento */
    router.delete('/eventos/:idEvento',
        auth,
        eventosController.deleteEvento
    )

    /**SECCION ASISTENTES */
    /* Guardar Asistente */
    router.post('/asistentes',
        auth,
        asistentesController.guardarAsistente
    )
    
    /* Listar Asistentes de un evento */
    router.get('/asistentes',
        auth,
        asistentesController.listarAsistentes
    )

    /* Actualizar datos de un asistente */
    router.put('/asistentes/:idAsistente',
        auth,
        asistentesController.updateAsistente
    )

    /* Eliminar un asistente */
    router.delete('/asistentes/:idAsistente',
        auth,
        asistentesController.deleteAsistente
    )
    
    return router;
}