'use strict'

require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const authRoutes = require('../routes/authentication');
const userRoutes = require('../routes/user');
const sessionRoutes = require('../routes/session');


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json({
    parameterLimit: Number(process.env.APP_PARAMETER_LIMIT),
    limit: process.env.APP_LIMIT,
    extended: false
}));

//Errores de json
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 400, message: err.message });
    }
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/users', userRoutes);

module.exports = app;