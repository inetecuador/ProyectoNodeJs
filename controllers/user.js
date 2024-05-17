'use strict'

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Users = require('../models/user');

const controller = {

    getAll: function (req, res) {

        Users.find({})
            .then(users => {
                return res.status(200).send({
                    status: 200,
                    message: "Usuarios encontrados.",
                    data: users
                });
            })
            .catch(error => {
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado."
                });
            });
    },

    getById: function (req, res) {
        const params = req.params;
        const id = params.id;
        Users.findById(id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(200).send({
                        status: 200,
                        message: "Usuario no encontrado"
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "Información de usuario",
                    data: usuario
                });
            })
            .catch(error => {
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado"
                });
            });

    },

    create: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }

        const data = req.body;
        Users.findOne({ email: data.email })
            .then(usuarioExistente => {
                if (usuarioExistente) {
                    return res.status(400).send({
                        status: 400,
                        message: "Usuario existente",
                    });
                }
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(data.contraseña, salt, function (err, hash) {
                        const user = new Users();
                        user.nombre = data.nombre;
                        user.edad = data.edad;
                        user.email = data.email;
                        user.contraseña = hash;
                        user.save()
                            .then(result => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Usuario almacenado.",
                                    data: result
                                });
                            })
                            .catch(error => {
                                console.error(error);
                                return res.status(500).send({
                                    status: 500,
                                    message: "Error detectado."
                                });
                            })
                    });
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado"
                });
            });
    },

    update: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }
        const params = req.params;
        const id = params.id;
        const data = req.body;

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(data.contraseña, salt, function (err, hash) {
                var user = {
                    nombre: data.nombre,
                    edad: data.edad,
                    email: data.email,
                    contraseña: hash,
                }

                Users.findByIdAndUpdate(id, user)
                    .then(result => {
                        if (!result) {
                            return res.status(200).send({
                                status: 200,
                                message: "Usuario no encontrado."
                            });
                        }
                        return res.status(200).send({
                            status: 200,
                            message: "Usuario actualizado."
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).send({
                            status: 500,
                            message: "Error detectado."
                        });
                    });
            });
        });
    },

    delete: function (req, res) {
        const params = req.params;
        const id = params.id;

        Users.findByIdAndDelete(id)
            .then(() => {
                return res.status(200).send({
                    status: 200,
                    message: "Usuario eliminado.",
                });
            })
            .catch(error => {
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado."
                });
            });
    }
};

module.exports = controller;