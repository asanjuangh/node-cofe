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
        req.user = decoded.user;
        next();
    });
};


let validAdmin = (req, res, next) => {

    let sessionUser = req.user;

    console.log('The user: ' + JSON.stringify(sessionUser) + ' the role:' + sessionUser.role);

    if (sessionUser.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            err: true,
            message: 'It is not a admin user'
        });
    } else {
        next();
    }
};


module.exports = {
    validateToken,
    validAdmin
}