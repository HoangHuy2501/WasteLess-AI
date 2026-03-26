const ApiError = require("../utils/ApiError");
const DishesRepository = require("../repository/DishesRepository");

class DailyServices {
    // check giá món ăn
    async checkPriceDish(dishes_id){
        try {
            const dish = await DishesRepository.GetPriceDishByID(dishes_id);
            if(!dish){
                throw ApiError.NotFound("Dish not found");
            }
            return dish;
        } catch (error) {
            throw error
        }
    }
}

module.exports = new DailyServices();