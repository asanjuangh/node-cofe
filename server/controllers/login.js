const express = require('express');
const app = express();
const bParser = require('body-parser');

const User = require('../../db/models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require("underscore");

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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

app.post('/google_sing_in', async(request, response) => {
    var body = request.body;
    let googleUser = await verify(body.idtoken).catch((e) => {
        return response.status(403).json({
            ok: false,
            message: e
        });
    });

    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) {
            return response.status(500).json({
                ok: false,
                message: err
            });
        }

        if (!userDB) {
            // create user
            var user = new User();

            user.name = googleUser.name;
            user.email = googleUser.email;
            user.img = googleUser.picture;
            user.password = ':D';
            user.google = true;
            user.role = "USER_ROLE"

            console.log('Creating user...');
            user.save(async(err, newUserDB) => {
                if (err) {
                    return response.status(500).json({
                        ok: false,
                        message: err
                    });
                }
                console.log('Setting new user');
                validateAndSendJWT(newUserDB);

            });

        } else {
            validateAndSendJWT(userDB);
        }





    });

    function validateAndSendJWT(userDB) {
        console.log('Creating auth token...');
        let token = jwt.sign({
            user: userDB
        }, process.env.JWT_SEED, {
            expiresIn: process.env.JWT_EXPIRATION_TIME
        });

        console.log('Resonse user with token...');
        return response.json({
            ok: true,
            user: userDB,
            token
        });
    }

    //return response.status(200).json({
    // user: googleUser
    //});

});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        image: payload.picture,
        google: true
    }


}



module.exports = app;