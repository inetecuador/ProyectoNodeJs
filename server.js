'use strict'

require('dotenv').config();
const app = require('./app/app');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Conexión exitosa a la base de datos.");
        const server = app.listen(Number(process.env.APP_PORT), () => {
            console.log(`Aplicación escuchando en el puerto ${process.env.APP_PORT}`);
        });
        server.timeout = Number(process.env.APP_TIMEOUT);
    })
    .catch(err => console.log(err));
