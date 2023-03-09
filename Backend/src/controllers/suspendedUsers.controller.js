let _suspendedUserService = null;
class SuspendedUsersController {
    constructor({ SuspendedUserService }) {
        _suspendedUserService = SuspendedUserService;
    }

    async createSuspention(req, res) {

        const { body } = req;
        let data = {
            reason: body.reason,
            author: body.author,
            suspentionMinutesQuantity: body.suspentionMinutesQuantity
        };
        const createdSuspention = await _suspendedUserService.createSuspention(data.reason, data.suspentionMinutesQuantity, data.author);
        return res.status(201).send(createdSuspention);
    }
    async get(req, res) {
        const { suspendedID } = req.params;
        const user = await _suspendedUserService.get(suspendedID);
        return res.send(user);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        const suspentions = await _suspendedUserService.getAll(pageSize, pageNum);
        return res.send(suspentions);
    }


    async delete(req, res) {
        const { suspendedID } = req.params;
        const { id } = req.user;

        const deletedSuspended = await _suspendedUserService.delete(suspendedID, id);
        return res.send(deletedSuspended);
    }
}

module.exports = SuspendedUsersController;