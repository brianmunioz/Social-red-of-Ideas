const BaseRepository = require('./base.repository'); //Se exporta para que la clase padre pueda usarse
let _vote = null;
class VoteRepository extends BaseRepository {
    constructor({ Vote }) {
        super(Vote);
        _vote = Vote;
    }
}
module.exports = VoteRepository;