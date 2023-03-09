const { Router } = require('express');
const { AuthMiddleWare } = require('../middlewares')
module.exports = function ({ ReportedIdeasController }) {
    const router = Router();
    router.get('/:reportedID',AuthMiddleWare('reportedIdeas'),ReportedIdeasController.get)
    router.get('',AuthMiddleWare('reportedIdeas'),ReportedIdeasController.getAll)
    router.post('', AuthMiddleWare('reportedIdeas'), ReportedIdeasController.createReport);
    router.delete("/:reportedID",AuthMiddleWare('reportedIdeas'), ReportedIdeasController.delete);

    return router;
};