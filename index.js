const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');

//creamos el servidor
const app = express();

//conectar a MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apipartylist',{
    useNewUrlParser: true
});

//Habilitar express.json
app.use(express.json({extended: true}));

//puerto de la app
const PORT = process.env.PORT || 5000;

//routing del servidor
app.use('/',routes());

//arrancamos al app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})