const BaseService = require('./base.service');
let _reportedIdeasRepository = null;
let _ideaRepository = null;



class ReportedIdeasService extends BaseService {
  constructor({ ReportedIdeasRepository, IdeaRepository }) {
    super(ReportedIdeasRepository);
    _reportedIdeasRepository = ReportedIdeasRepository;
    _ideaRepository = IdeaRepository;
  }

  async createReport(reason, ideaID) {
    if (!ideaID) {
      const error = new Error();
      error.status = 400;
      error.message = "ideaID must be sent";
      throw error;
    }
    if (reason === '') {
      const error = new Error();
      error.status = 400;
      error.message = "reason must be sent";
      throw error;
    }


    const idea = await _ideaRepository.get(ideaID);

    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = "idea does not exist";
      throw error;
    }

    const createdReport = await _reportedIdeasRepository.create({
      reason,
      idea: ideaID
    });
    idea.reports.push(createdReport);

    return await _ideaRepository.update(ideaID, { reports: idea.reports });
  }
}
module.exports = ReportedIdeasService;