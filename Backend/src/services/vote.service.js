const BaseService = require('./base.service');
let _voteRepository = null,
    _ideaRepository = null;


class VoteService extends BaseService {
    constructor({ VoteRepository, IdeaRepository }) {
        super(VoteRepository);
        _voteRepository = VoteRepository;
        _ideaRepository = IdeaRepository
    }

  
    async getIdeaVote(ideaID) {
        if (!ideaID) {
            const error = new error();
            error.status = 400;
            error.message = "ideaID must be sent";
            throw error;
        }
        const idea = await _ideaRepository.get(ideaID);

        if (!idea) {
            const error = new error();
            error.status = 400;
            error.message = "UserID must be sent";
            throw error;
        }

        const { vote } = idea;
        return vote;
    }

    async createVote(vote, ideaId, userId) {
        if (!ideaId) {
          const error = new Error();
          error.status = 400;
          error.message = "ideaId must be sent";
          throw error;
        }
        if (vote === '') {
          const error = new Error();
          error.status = 400;
          error.message = "The vote must be true or false";
          throw error;
        }
    
        const idea = await _ideaRepository.get(ideaId);     
    
    
        if (!idea) {
          const error = new Error();
          error.status = 404;
          error.message = "idea does not exist";
          throw error;
        }
        idea.vote.find(el =>{
            if(el.author.id === userId){
                const error = new Error();
                error.status = 400;
                error.message ="The voter has already voted on the idea! You can only change your vote or delete your vote";
                throw error;
            }
        })
    
        const createdVote = await _voteRepository.create({
          ...vote,
          author: userId
        });
        idea.vote.push(createdVote);
    
        return await _ideaRepository.update(ideaId, { vote: idea.vote });
      }
}
module.exports = VoteService;