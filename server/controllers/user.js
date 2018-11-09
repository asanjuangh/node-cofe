const express = require('express');
const app = express();
const bParser = require('body-parser');

const User = require('../../db/models/users');

// parse application/x-www-form-urlencoded
app.use(bParser.urlencoded({ extended: false }))

// parse application/json
app.use(bParser.json())

app.get('/users', function(req, res) {
    res.json('hello world');
});

app.get('/users/:id', function(req, res) {
    let id = req.params.id;

    res.json('hello world');
});

app.post('/users', function(req, res) {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role

    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        } else {
            return res.json({
                ok: true,
                user: userDB
            });
        }
    });


    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         message: 'El nombre es necesario'
    //     });
    // } else {
    //     res.json(body);
    // }



});

app.put('/users/:id', function(req, res) {
    let id = req.params.id;
    res.json('hello world');
});

module.exports = app;