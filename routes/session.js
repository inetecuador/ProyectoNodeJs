'use strict'

const express = require('express');
const router = express.Router();

const tokenValidationMiddleware = require('../middleware/verifyToken');
const sessionController = require("../controllers/session");

router.get('/currentUser',
    tokenValidationMiddleware.verifyToken, 
    sessionController.getCurrentUser);
module.exports = router;