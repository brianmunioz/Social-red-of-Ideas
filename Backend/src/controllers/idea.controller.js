let _ideaService = null;
class IdeaController {
    constructor({ IdeaService }) {
        _ideaService = IdeaService;
    }

    async get(req, res) {
        const { ideaID } = req.params;
        const idea = await _ideaService.get(ideaID);
        return res.send(idea);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        const ideas = await _ideaService.getAll(pageSize, pageNum);
        return res.send(ideas);
    }
    async create(req, res) {

        const { body } = req;
        const {id} = req.user;
        let datos = {
            idea: body.idea,
            description: body.description,
            author: id
        };        
        const createdIdea = await _ideaService.create(datos);
        return res.status(201).send(createdIdea);
    }
    async update(req, res) {
        const { body } = req;
        
        const { ideaID } = req.params;
        const updatedIdea = await _ideaService.update(ideaID, body);
        return res.send(updatedIdea);
    }

    async delete(req, res) {
        const {id} = req.user;
        const { ideaID } = req.params;
        const deletedIdea = await _ideaService.delete(ideaID,id);
        return res.send(deletedIdea);
    }

    async getUserIdeas(req, res) {
        const { userID } = req.params;
        const ideas = await _ideaService.getUserIdeas(userID);
        return res.send(ideas);
    }

}

module.exports = IdeaController;