const BaseService = require('./base.service');
let _ideaRepository = null;


class IdeaService extends BaseService {
    constructor({ IdeaRepository }) {
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }
    async getUserIdeas(author) {
        
        if (!author) {
            const error = new error();
            error.status = 400;
            error.message = "UserID must be sent";
            throw error;
        }
        return await _ideaRepository.getUserIdeas(author);
    }


}
module.exports = IdeaService;