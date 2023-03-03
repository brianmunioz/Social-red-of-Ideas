const { Router } = require('express');
const { cacheMiddleWare, AuthMiddleWare, parseIntMiddleWare } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');
module.exports = function ({ IdeaController }) {
    const router = Router();


    router.get("/:ideaID", IdeaController.get);
    router.get("",IdeaController.getAll);
    router.get("/:userID/all",[AuthMiddleWare('idea_getUserIdeas')],IdeaController.getUserIdeas);

    router.post("",[AuthMiddleWare('idea_post'),cacheMiddleWare(CACHE_TIME.ONE_HOUR), parseIntMiddleWare], IdeaController.create);
    router.patch("/:ideaID", [AuthMiddleWare('idea_patch')],  IdeaController.update);
    router.delete("/:ideaID",  [AuthMiddleWare('idea_delete')], IdeaController.delete);



    return router;
};