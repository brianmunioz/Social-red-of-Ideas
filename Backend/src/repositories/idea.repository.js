const BaseRepository = require('./base.repository'); //Se exporta para que la clase padre pueda usarse
let _idea = null;
class IdeaRepository extends BaseRepository {
    constructor({ Idea }) {
        super(Idea);
        _idea = Idea;
    }

    async getUserIdeas(author) {
        return await _idea.find({ author });
    }
}
module.exports = IdeaRepository;