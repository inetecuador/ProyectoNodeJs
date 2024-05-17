'use strict'

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const tokenValidationMiddleware = require('../middleware/verifyToken');
const userController = require("../controllers/user");

// // create
router.post('/',
    tokenValidationMiddleware.verifyToken,
    [
        body("nombre").not().isEmpty(),
        body("edad").not().isEmpty(),
        body("email").not().isEmpty(),
        body("contraseña").not().isEmpty()
    ],
    userController.create);

// read
router.get('/',
    tokenValidationMiddleware.verifyToken,
    userController.getAll);

router.get('/:id',
    tokenValidationMiddleware.verifyToken,
    userController.getById);

// // update
router.put('/:id',
    tokenValidationMiddleware.verifyToken,
    [
        body("nombre").not().isEmpty(),
        body("edad").not().isEmpty(),
        body("email").not().isEmpty(),
        body("contraseña").not().isEmpty()
    ]
    , userController.update);

// // delete
router.delete('/:id',
    tokenValidationMiddleware.verifyToken,
    userController.delete);

module.exports = router;