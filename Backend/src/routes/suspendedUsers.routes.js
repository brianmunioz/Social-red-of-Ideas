const { Router } = require('express');
const { AuthMiddleWare } = require('../middlewares')
module.exports = function ({ SuspendedUsersController }) {
    const router = Router();
    router.get('/:suspendedID', AuthMiddleWare('suspendedUsers'), SuspendedUsersController.get)
    router.get('', AuthMiddleWare('suspendedUsers'), SuspendedUsersController.getAll)
    router.post('', AuthMiddleWare('suspendedUsers'), SuspendedUsersController.createSuspention);
    router.delete("/:suspendedID", AuthMiddleWare('suspendedUsers_delete'), SuspendedUsersController.delete);

    return router;
};