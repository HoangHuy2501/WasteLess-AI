
const { UserModel, BrandModel } = require('../models/index');
class UserRepository {
    async InfoUser(id) {
        return await UserModel.findOne({
            where: { id: id },
            attributes: ['id', 'email', 'name', 'phone', 'address',"created_at"],
            include: [{
                model: BrandModel,
                attributes: ['name', 'address'],
            }],
        });
    }
    // khóa hoặc mở khóa tài khoản
    async lockOrUnlockUser(id, status) {
        return await UserModel.update({status: status}, { where: { id: id } });
    }
}

module.exports = new UserRepository();