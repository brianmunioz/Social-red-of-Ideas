const BaseRepository = require('./base.repository');
let _suspendedUser = null;

class SuspendedUsersRepository extends BaseRepository {
    constructor({SuspendedUsers}){
        super(SuspendedUsers);
        _suspendedUser = SuspendedUsers;
    }
}
module.exports = SuspendedUsersRepository;