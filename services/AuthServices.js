const AuthRepository = require('../repository/AuthRepository');

class AuthServices{
    async login() {
        // Logic for user login
        return await AuthRepository.getInfoUser();
    }
}

module.exports = new AuthServices();