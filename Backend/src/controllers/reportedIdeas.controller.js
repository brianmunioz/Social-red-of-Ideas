let _reportedIdeasService = null;
class ReportedIdeasController {
    constructor({ ReportedIdeasService }) {
        _reportedIdeasService = ReportedIdeasService;
    }

    async createReport(req, res) {
        const { body } = req;
        let data = {
            reason: body.reason,
            idea: body.idea
        };
        const createdReport = await _reportedIdeasService.createReport(
            data.reason,
            data.idea
        );
        return res.status(201).send(createdReport);
    }

    async get(req, res) {
        const { reportedID } = req.params;
        const user = await _reportedIdeasService.get(reportedID);
        return res.send(user);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        const reports = await _reportedIdeasService.getAll(pageSize, pageNum);
        return res.send(reports);
    }


    async delete(req, res) {
        const { reportedID } = req.params;
        const { id } = req.user;

        const deletedReport = await _reportedIdeasService.delete(reportedID, id);
        return res.send(deletedReport);
    }
}

module.exports = ReportedIdeasController;