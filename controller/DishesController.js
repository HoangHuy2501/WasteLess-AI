const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");
const CheckServices = require("../services/CheckServices");
const DishesRepository = require("../repository/DishesRepository");


// tạo món ăn mới cho manager
exports.CreateDishes = async function (req, res, next) {
    try {
        const data = req.body;
        const brandID = req.params.brandID;
        const userID = req.params.userID;
        if(!brandID || !userID){
            throw ApiError.ValidationError("Missing required fields brandID or userID");
        }
        if (!data.name || !data.price || !data.dish_category_id || !data.des) {
            throw ApiError.ValidationError("Missing required fields");
        }
        await CheckServices.checkCategoryDishes(data.dish_category_id);
        const createDishes = await DishesRepository.CreateDishes(data, brandID , userID);
        return res.json(ApiSuccess.created("Dish created successfully", createDishes));
    } catch (error) {
        return next(error);
    }
};
// cập nhập món ăn cho manager
exports.UpdateDishes = async function (req, res, next) {
    try {
        const data = req.body;
        const id = req.params.id;
        if (!data.name || !data.price || !data.dish_category_id || !data.des) {
            throw ApiError.ValidationError("Missing required fields");
        }
        await CheckServices.checkCategoryDishes(data.dish_category_id);
        const updateDishes = await DishesRepository.UpdateDishes(id, data);
        return res.json(ApiSuccess.updated("Dish updated successfully", updateDishes));
    } catch (error) {
        return next(error);
    }
};
// xóa món ăn cho manager
exports.DeleteDishes = async function (req, res, next) {
    try {
        const id = req.params.id;
        const deleteDishes = await DishesRepository.DeleteDishes(id);
        return res.json(ApiSuccess.deleted("Dish deleted successfully", deleteDishes));
    } catch (error) {
        return next(error);
    }
};