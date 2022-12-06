const { Router } = require('express');
const { AuthMiddleWare, parseIntMiddleWare } = require('../middlewares')
module.exports = function ({ CommentController }) {
    const router = Router();
    router.get("/:commentID/unique", CommentController.get);
    router.get("/:ideaID", CommentController.getIdeasComments);
    router.post('/:ideaId', [AuthMiddleWare, parseIntMiddleWare], CommentController.createComment);
    router.delete("/:commentID", CommentController.delete);

    return router;
};