let jwt = require('jsonwebtoken');


let validateToken = (req, res, next) => {

    let token = req.get('Authorization');
    jwt.verify(token, process.env.JWT_SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: err
            });
        }

        next();
    });
};


module.exports = {
    validateToken
}