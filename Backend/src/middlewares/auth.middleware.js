const  jwt = require('jsonwebtoken') ;
const {JWT_SECRET} = require('../config') ; //nuestro token
module.exports= function (req, res, next) {
    const token = req.headers['authorization'];//token enviado por el usuario
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
        next();
    })
}