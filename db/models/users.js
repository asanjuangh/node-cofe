const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is necesary']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [, 'The password is necesary']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Users', usuarioSchema);