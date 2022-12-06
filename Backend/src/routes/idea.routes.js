const { Router } = require('express');
const { cacheMiddleWare, AuthMiddleWare, parseIntMiddleWare } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');
module.exports = function ({ IdeaController }) {
    const router = Router();


    router.get("/:ideaID", IdeaController.get);
    router.get("",IdeaController.getAll);
    router.get("/:userID/all",[AuthMiddleWare],IdeaController.getUserIdeas);

    router.post("",[AuthMiddleWare,cacheMiddleWare(CACHE_TIME.ONE_HOUR), parseIntMiddleWare], IdeaController.create);
    router.patch("/:ideaID", [AuthMiddleWare],  IdeaController.update);
    router.delete("/:ideaID",  [AuthMiddleWare], IdeaController.delete);



    return router;
};