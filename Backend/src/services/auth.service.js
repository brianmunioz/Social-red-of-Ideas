const { generateToken } = require('../helpers/jwt.helper');  //Te genera un token
let _userService = null;

class AuthService {
    constructor({ UserService }) {
        _userService = UserService;
    }
    async signUp(user) {
        const { username } = user;
        const userExist = await _userService.getUserByUserName(username.toLowerCase());
        if (userExist) {
            const error = new Error();
            error.status = 400;
            error.message = 'User already exists';
            throw error;
        }
        return await _userService.create(user);
    }
    async signIn(user) {
        const { username, password } = user;
        const userExist = await _userService.getUserByUserName(username.trim().toLowerCase());
        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = 'user does´t exist';
            throw error;
        }
        const validPassword = userExist.comparePasswords(password);
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message = 'Invalid password';
            throw error;
        }
        const userToEncode = {
            username: userExist.username,
            id: userExist._id,
            rol: userExist.rol
        };
        const token = generateToken(userToEncode);

        return { token, user: userExist };
    }


}
module.exports = AuthService;