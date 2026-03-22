const {
  IngredientModel,
  IngredientStockTransactionModel,
  IngredientCategoryModel
} = require("../models/index");
const sequelize = require("../config/connectData");
class IngredientRepository {
  async createIngredient(data, brandID) {
    return await IngredientModel.create({ ...data, brand_id: brandID });
  }
  // thêm số lượng nguyên liệu mới
  async addIngredientTransaction(data, userID, option = {}) {
    return await IngredientStockTransactionModel.create(
      { ...data, user_id: userID },
      { ...option },
    );
  }
  // cập nhật số lượng nguyên liệu
  async updateIngredientStock(ingredientID, quantity, option = {}) {
    await IngredientModel.update(
      { current_stock: sequelize.literal(`current_stock + ${quantity}`) },
      { where: { id: ingredientID }, ...option },
    );
  }
  // chỉnh sữa tên nguyên liệu hoặc đơn vị tính hoặc số lượng tồn kho tối thiểu hoặc category của nguyên liệu
  async updateIngredient(ingredientID, data) {
    return await IngredientModel.update(data, { where: { id: ingredientID } });
  }
  // xóa nguyên liệu
  async deleteIngredient(ingredientID) {
    return await IngredientModel.destroy({ where: { id: ingredientID } });
  }
  // get nguyên liệu theo id
  async getIngredient(ingredientID) {
    return await IngredientModel.findOne({ 
        where: { id: ingredientID },
        include: [{
            model: IngredientCategoryModel,
            attributes: ['id', 'name']
        }]
    });
  }
}
module.exports = new IngredientRepository();
