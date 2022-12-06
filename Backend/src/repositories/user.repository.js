const BaseRepository = require('./base.repository'); //Se exporta para que la clase padre pueda usarse
let _user = null;
class UserRepository extends BaseRepository {
    constructor({ User }) {
        super(User);
        _user = User;
    }

    async getUserByUserName(username) {
        return await _user.findOne({ username });
    }
}
module.exports = UserRepository;