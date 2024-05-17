'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = Schema({
    email: { 
        type: String, 
        require: true, 
        unique: true },
    token: {
        type: String,
        require: true
    },
    creationDate: Date,
    expirationDate: String,
    active: Boolean
});

module.exports = mongoose.model('sessions', SessionSchema);