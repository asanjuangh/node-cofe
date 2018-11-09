require('../config/config');

const express = require('express');
const app = express();
const bParser = require('body-parser');



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
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'El nombre es necesario'
        });
    } else {
        res.json(body);
    }



});

app.put('/users/:id', function(req, res) {
    let id = req.params.id;
    res.json('hello world');
});

app.listen(process.env.PORT, () => {
    console.log('Listening port:' + process.env.PORT);
});