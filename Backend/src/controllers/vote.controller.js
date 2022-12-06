let _voteService = null;
class VoteController {
    constructor({ VoteService }) {
        _voteService = VoteService;
    }

    async get(req, res) {
        const { voteID } = req.params;
        const user = await _voteService.get(voteID);
        return res.send(user);
    }

    async update(req, res) {
        const { body } = req;
        const { voteID } = req.params;
        const updatedVote = await _voteService.update(voteID, body);
        return res.send(updatedVote);
    }

    async delete(req, res) {
        const {id} = req.user;
        console.log(id);

        const { voteID } = req.params;
        const deletedVote = await _voteService.delete(voteID,id);
        return res.send(deletedVote);
    }

    async getIdeasVote(req, res) {
        const { ideaID } = req.params;
        const vote = await _voteService.getIdeasComments(ideaID);
        return res.send(vote);
    }
    async createVote(req, res) {
        const { body } = req;
        const { ideaId } = req.params;
        const { id: userId } = req.user;
        const createdVote = await _voteService.createVote(
            body,
            ideaId,
            userId
        );
        return res.status(201).send(createdVote);
    }
}

module.exports = VoteController;