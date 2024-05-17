'use strict'

const Users = require('../models/user');

var controller = {
    getCurrentUser: function (req, res) {
        const id = req.decoded.user._id;
        Users.findById(id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        status: 404,
                        message: "Usuario no encontrado."
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "Usuario encontrado.",
                    data: user
                });
            })
            .catch(error => {
                return res.status(400).send({
                    status: 400,
                    message: "Datos no válidos"
                });
            });
    }
}

module.exports = controller;