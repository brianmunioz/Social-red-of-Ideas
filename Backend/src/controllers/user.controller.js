let _userService = null;
class UserController {
    constructor({ UserService }) {
        _userService = UserService;
    }

    async get(req, res) {
        const { userID } = req.params;
        const user = await _userService.get(userID);
        return res.send(user);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        const users = await _userService.getAll(pageSize, pageNum);
        return res.send(users);
    }
    async update(req, res) {
        const { body } = req;
        const { userID } = req.params;
        const updatedUser = await _userService.update(userID, body);
        return res.send(updatedUser);
    }

    async delete(req, res) {
        const { userID } = req.params;
        const {id} = req.user;

        const deletedUser = await _userService.delete(userID,id);
        return res.send(deletedUser);
    }
}

module.exports = UserController;