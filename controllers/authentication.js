'use strict'
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const Users = require('../models/user');
const Sessions = require('../models/session');

var controller = {
    login: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }

        var data = req.body;
        Users.findOne({ email: data.email })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        status: 401,
                        message: "Credenciales inválidas."
                    });
                }

                bcrypt.compare(data.contraseña, user.contraseña, function (err, result) {
                    if (process.env.BYPASS_ENCRYPTION == "true") {
                        if (data.contraseña == user.contraseña)
                            result = true;
                    }
                    if (result) {
                        const payLoad = {
                            user: user
                        }
                        const token = jwt.sign(payLoad, process.env.KEY,
                            {
                                expiresIn: process.env.AUTH_TOKEN_EXPIRESIN
                            });

                        const newSession = {
                            email: user.email,
                            token: token,
                            creationDate: new Date().toISOString(),
                            expirationDate: process.env.AUTH_TOKEN_EXPIRESIN,
                            active: true
                        }
                        Sessions.findOneAndUpdate(
                            { email: user.email },
                            newSession,
                            {
                                upsert: true,
                                new: true
                            })
                            .then(session => {
                                if (!session) {
                                    return res.status(401).send({
                                        status: 401,
                                        message: "Error al iniciar la sesión."
                                    });
                                }

                                return res.status(200).send({
                                    status: 200,
                                    message: "Login correcto.",
                                    token: token
                                });
                            })
                            .catch(error => {
                                console.error(error);
                                return res.status(500).send({
                                    status: 500,
                                    message: "Error detectado."
                                });
                            });
                    } else {
                        return res.status(401).send({
                            status: 401,
                            message: "Credenciales inválidas."
                        });
                    }
                });
            })
            .catch(error => {
                return res.status(400).send({
                    status: 400,
                    message: "Datos no válidos"
                });
            });

    },

    logout: function (req, res) {
        const header = req.headers.authorization;
        const token = header.split(" ").slice(-1)[0];
        Sessions.findOneAndDelete({ email: req.decoded.user.email, token: token })
            .then(session => {
                if (!session) {
                    return res.status(200).send({
                        status: 200,
                        message: "Datos no válidos."
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "Sesión finalizada.",
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Datos no válidos."
                });
            });
    }
}

module.exports = controller;