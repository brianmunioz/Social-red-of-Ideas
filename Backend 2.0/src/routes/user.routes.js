const { Router } = require('express');
const { AuthMiddleWare, parseIntMiddleWare } = require('../middlewares')
module.exports = function ({ UserController }) {
    const router = Router();
    router.get("/:userID", UserController.get);
    router.get("", [AuthMiddleWare, parseIntMiddleWare], UserController.getAll);
    router.patch("/:userID",AuthMiddleWare, UserController.update);
    router.delete("/:userID",AuthMiddleWare, UserController.delete);
    return router;
};