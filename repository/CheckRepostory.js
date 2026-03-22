
const { IngredientCategoryModel, DishCategoryModel } = require("../models/index");
class CheckRepository {
    async checkCategoryIngredient(id) {
        return await IngredientCategoryModel.findOne({where: {id: id}});
    }
    async checkCategoryDishes(id) {
        return await DishCategoryModel.findOne({where: {id: id}});
    }
}

module.exports = new CheckRepository();