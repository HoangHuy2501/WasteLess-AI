const {DishModel} = require("../models/index");


class DishesRepository {
    async CreateDishes(data, brandID, userID) {
        try {
            const createDishes = await DishModel.create({ ...data, brand_id: brandID, user_id: userID });
            return createDishes;
        } catch (error) {
            throw error;
        }
    }
    async UpdateDishes(id, data) {
        try {
            const updateDishes = await DishModel.findByIdAndUpdate(id, data, { new: true });
            return updateDishes;
        } catch (error) {
            throw error;
        }
    }
    async DeleteDishes(id) {
        try {
            const deleteDishes = await DishModel.findByIdAndDelete(id);
            return deleteDishes;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = new DishesRepository();