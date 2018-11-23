const express = require('express');
const app = express();
const bParser = require('body-parser');

const { validateToken } = require('../../middleware/validationToken');

const User = require('../../db/models/users');

const bcrypt = require('bcrypt');
const _ = require("underscore");

// parse application/x-www-form-urlencoded
app.use(bParser.urlencoded({ extended: false }))

// parse application/json
app.use(bParser.json())


// app.get('/users/:id', function(req, res) {
//     let id = req.params.id;

//     res.json('hello world');
// });

app.get('/users', validateToken, function(req, res) {

    console.log('Getting user pagination...');
    let limit = new Number(req.query.limit) || 5;
    let offset = new Number(req.query.offset) || 0;

    User.find({}, 'name email, img role status google')
        .limit(limit)
        .skip(offset)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            } else {
                User.count({}, (err, number) => {
                    return res.json({
                        ok: true,
                        users: users,
                        element_number: number
                    });
                });

            }
        });
});

//Borrado fisico
app.delete('/users/:id', function(req, res) {
    let userId = req.param.id;
    User.deleteOne({ id: userId }, (err, rep) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        } else {
            return res.json({
                ok: true,
                user: rep
            });
        }
    });
});

app.post('/users', function(req, res) {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    console.log('Updating user: ' + id + ', object: ' + JSON.stringify(body));

    User.findOneAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, userDB) => {
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

    //res.json('hello world');
});

module.exports = app;