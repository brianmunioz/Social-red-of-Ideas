const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
module.exports = function (typeOperation) {

    return function (req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            const error = new Error();
            error.message = "Token not exist!";
            error.status = 401;
            throw error;
        }
        jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
            if (err) {
                const error = new Error();
                error.message = "Invalid token!";
                error.status = 401;
                throw error;
            }
            req.user = decodedToken.user;
            if (req.user.rol === 'user') {
                if (typeOperation === 'comment_delete' || typeOperation === 'user_delete') {
                    const error = new Error();
                    error.message = "You not are admin!";
                    error.status = 401;
                    throw error;
                }                
            }
            next();
        })
    }
}