'use strict'
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    contraseña: {
      type: String,
      required: true,
    },
});
module.exports = mongoose.model("users", userSchema);