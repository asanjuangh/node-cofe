const express = require('express');
const app = express();
const bParser = require('body-parser');

const User = require('../../db/models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require("underscore");

app.post('/login', (request, response) => {

    let body = request.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        if (!userDB) {
            return response.status(400).json({
                ok: false,
                message: 'The user is invalid'
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return response.status(400).json({
                ok: false,
                message: 'The password is invalid'
            });
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.JWT_SEED, {
            expiresIn: process.env.JWT_EXPIRATION_TIME
        });

        return response.json({
            ok: true,
            user: userDB,
            token
        });
    });


});

module.exports = app;