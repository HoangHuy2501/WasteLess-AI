const {DishModel, DishRecipeModel} = require("../models/index");


class DishesRepository {
    async CreateDishes(data, brandID, userID, options={}) {
        try {
            const createDishes = await DishModel.create({ ...data, brand_id: brandID, user_id: userID },{...options});
            return createDishes;
        } catch (error) {
            throw error;
        }
    }
    async UpdateDishes(id, data) {
        try {
            const updateDishes = await DishModel.update(data, { where: { id: id } });
            return updateDishes;
        } catch (error) {
            throw error;
        }
    }
    async DeleteDishes(id) {
        try {
            const deleteDishes = await DishModel.destroy({ where: { id: id } });
            return deleteDishes;
        } catch (error) {
            throw error;
        }
    }
    // tạo dish_recipes mới
    async CreateDishRecipes(data, dishes_id, options={}) {
        try {
            const createDishRecipes = await DishRecipeModel.create({dishes_id: dishes_id, ingredient_id: data.ingredient_id, quantity: data.quantity},{...options});
            return createDishRecipes;
        } catch (error) {
            throw error;
        }
    }
    // lấy tất cả dish_recipes theo status false
    async GetAllDishesFalse() {
        try {
            const dishes = await DishModel.findAll({ where: { status: false } });
            return dishes;
        } catch (error) {
            throw error;
        }
    }
    // duyệt món ăn
    async ApproveDishes(id) {
        try {
            const approveDishes = await DishModel.update({ status: true }, { where: { id: id } });
            return approveDishes;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new DishesRepository();