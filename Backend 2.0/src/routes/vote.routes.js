const { Router } = require('express');
const { AuthMiddleWare } = require('../middlewares')
module.exports = function ({ VoteController }) {
    const router = Router();
    router.post('/:ideaId', AuthMiddleWare, VoteController.createVote);
    router.delete("/:voteID",AuthMiddleWare, VoteController.delete);
    router.patch("/:voteID",AuthMiddleWare, VoteController.update);


    return router;
};