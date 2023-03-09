const BaseService = require('./base.service');
let _suspendedUsersRepository = null;
let _userRepository = null;


class SuspendedUsersService extends BaseService {
    constructor({ SuspendedUsersRepository, UserRepository }) {
        super(SuspendedUsersRepository);
        _suspendedUsersRepository = SuspendedUsersRepository;
        _userRepository = UserRepository;

    }

    async createSuspention(reason, suspentionMinutesQuantity, author) {
        if (!author) {
            const error = new Error();
            error.status = 400;
            error.message = "author must be sent";
            throw error;
        }
        if (reason === '') {
            const error = new Error();
            error.status = 400;
            error.message = "reason must be sent";
            throw error;
        }
        if (suspentionMinutesQuantity === '') {
            const error = new Error();
            error.status = 400;
            error.message = "suspentionMinutesQuantity must be sent";
            throw error;
        }


        const user = await _userRepository.get(author);

        if (!user) {
            const error = new Error();
            error.status = 404;
            error.message = "idea does not exist";
            throw error;
        }

        const createdSuspention = await _suspendedUsersRepository.create({
            reason,
            author,
            suspentionMinutesQuantity
        });
        user.suspentions.push(createdSuspention);

        return await _userRepository.update(user, { suspentions: user.suspentions });
    }
}

module.exports = SuspendedUsersService;