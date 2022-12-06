const BaseRepository = require('./base.repository'); //Se exporta para que la clase padre pueda usarse
let _comment = null;
class CommentRepository extends BaseRepository {
    constructor({ Comment }) {
        super(Comment);
        _comment = Comment;
    }
}
module.exports = CommentRepository;