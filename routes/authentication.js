'use strict'

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const tokenValidationMiddleware = require('../middleware/verifyToken');
const authController = require("../controllers/authentication");

router.post('/login',
    [
        body("email").not().isEmpty(),
        body("contraseña").not().isEmpty()
    ]
    , authController.login);
router.post('/logout',
    tokenValidationMiddleware.verifyToken,
    authController.logout);

module.exports = router;