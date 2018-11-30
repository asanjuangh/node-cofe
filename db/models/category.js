const mongoose = require('mongoose');

//const uniqueValidator = require('mongoose-unique-validator');

let Schemma = mongoose.Schema;

let categorySchemma = new Schemma({
    description: {
        type: String,
        unique: true,
        required: [true, 'The description is necesary'],
    },
    usuer: {
        type: Schemma.Types.ObjectId,
        ref: 'Users'
    }
});

//categorySchemma.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Category', categorySchemma);