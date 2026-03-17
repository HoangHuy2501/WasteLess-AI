const {UserModel, BrandModel} = require('../models/index');

class AuthRepository {
    async getInfoUser() {
        // return await UserModel.findOne({ where: { email } });
        return await BrandModel.findAll()
    }
}
module.exports = new AuthRepository();