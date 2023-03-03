const { Router } = require('express');
const { AuthMiddleWare } = require('../middlewares')
module.exports = function ({ VoteController }) {
    const router = Router();
    router.post('/:ideaId', AuthMiddleWare('vote_post'), VoteController.createVote);
    router.delete("/:voteID",AuthMiddleWare('vote_delete'), VoteController.delete);
    router.patch("/:voteID",AuthMiddleWare('vote_patch'), VoteController.update);


    return router;
};