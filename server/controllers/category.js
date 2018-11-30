const express = require('express');

const app = express();

const bParser = require('body-parser');

const { validateToken } = require('../../middleware/validationToken');

const Category = require('../../db/models/category');

const _ = require("underscore");

// parse application/x-www-form-urlencoded
app.use(bParser.urlencoded({ extended: false }))

// parse application/json
app.use(bParser.json())

//find all users
app.get('/category', validateToken, (req, resp) => {

    Category.find({})
        .populate('usuer', 'name email')
        .sort({ description: 'asc' })
        .exec((err, categories) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    message: err
                });
            }

            return resp.status(200).json({
                categories: categories
            })
        });
});

//find by id
app.get('/category/:id', validateToken, (req, resp) => {
    let id = req.params.id;
    console.log('Id to find: ' + id);
    Category.findById(id)
        .populate('usuer', 'name email')
        .exec((err, category) => {
            if (err) {
                return sendError(err, resp);
            } else {
                if (category) {
                    return resp.status(200).json({
                        ok: true,
                        category: category
                    });
                } else {
                    return resp.status(400).json({
                        ok: false,
                        message: 'Category not found'
                    });
                }
            }
        });
});

//create category
app.post('/category', validateToken, (req, resp) => {

    let body = req.body;
    console.log('The user conten: ' + JSON.stringify(req.user));

    let category = new Category();
    category.description = body.description;
    category.usuer = req.user._id;

    category.save((err, newCategory) => {
        if (err) {
            return sendError(err, resp);
        } else {
            return resp.status(200).json({
                category: newCategory
            });
        }


    });
});

//update category
app.put('/category/:id', validateToken, (req, resp) => {

    let body = req.body;
    let id = req.params.id;
    console.log('The id to update: ' + id);
    console.log('The user conten: ' + JSON.stringify(req.user));
    var object = {
        description: body.description,
        usuer: req.user._id
    }

    var options = {
        new: true,
        runValidators: true
    }
    Category.findByIdAndUpdate(id, object, options, (err, category) => {
        if (err) {
            return sendError(err, resp);
        } else {
            return resp.status(200).json({
                ok: true,
                category
            });
        }
    });


});


app.delete('/category/:id', validateToken, (req, resp) => {
    let id = req.params.id;

    Category.findByIdAndDelete(id, (err, response) => {
        if (err) {
            return sendError(err, resp);
        } else {
            if (response) {
                return resp.status(200).json({
                    ok: true,
                    message: 'Category deleted',
                    category: response
                });
            } else {
                return resp.status(400).json({
                    ok: true,
                    message: 'Category not found',
                });
            }
        }
    });
});

function sendError(err, resp) {

    return resp.status(500).json({
        ok: false,
        message: err
    });

}




module.exports = app;