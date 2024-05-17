'use strict'

require('dotenv').config();
const jwt = require("jsonwebtoken");
const AccessToken = require('../models/session');

var middleware = {
    verifyToken: function (req, res, next) {
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).send({
                status: 401,
                message: "Token de autorización no proporcionado."
            });
        }

        const token = header.split(" ").slice(-1)[0];
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    status: 401,
                    message: "Token de autorización no válido."
                });
            } else {
                req.decoded = decoded;
                AccessToken.findOne({ email: req.decoded.user.email, token: token, active: true })
                    .then(session => {
                        if (!session) {
                            return res.status(401).send({
                                status: 401,
                                message: "Sesión no iniciada."
                            });
                        }
                        next();
                    })
                    .catch(error => {
                        return res.status(500).send({
                            status: 500,
                            message: "Error detectado."
                        });
                    });
            }
        });
    }
};

module.exports = middleware;