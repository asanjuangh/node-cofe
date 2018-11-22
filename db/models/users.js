const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let roleValidation = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role válido'
}

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is necesary']
    },
    email: {
        type: String,
        required: true,
        unique: true,

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
        default: 'USER_ROLE',
        enum: roleValidation,

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

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

usuarioSchema.methods.toJSON = function() {
    let object = this;
    let userObject = object.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model('Users', usuarioSchema);