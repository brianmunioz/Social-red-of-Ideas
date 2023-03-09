const BaseRepository = require('./base.repository');
let _reportedIdeas = null;

class ReportedIdeasRepository extends BaseRepository {
    constructor({ReportedIdeas}){
        super(ReportedIdeas);
        _reportedIdeas = ReportedIdeas;
    }
}
module.exports = ReportedIdeasRepository;