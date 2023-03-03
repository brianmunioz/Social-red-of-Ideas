const { Router } = require('express');
const { AuthMiddleWare, parseIntMiddleWare } = require('../middlewares')
module.exports = function ({ UserController }) {
    const router = Router();
    router.get("/:userID", UserController.get);
    router.get("", [AuthMiddleWare('user_getAll'), parseIntMiddleWare], UserController.getAll);
    router.patch("/:userID",AuthMiddleWare('user_patch'), UserController.update);
    router.delete("/:userID",[AuthMiddleWare('user_delete'), parseIntMiddleWare],AuthMiddleWare, UserController.delete);
    return router;
};