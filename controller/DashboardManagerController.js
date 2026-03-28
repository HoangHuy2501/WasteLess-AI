const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");
const CheckServices = require("../services/CheckServices");
const DashboardRepository = require("../repository/DashboardRepository");

exports.GetReportDishes = async function (req, res, next) {
    try {
        const brandID = req.user.brandID;
        if (!brandID) {
            throw ApiError.ValidationError("Missing required field brandID");
        }
        const checkBrand = await CheckServices.checkBrand(brandID);
        if (!checkBrand) {
            throw ApiError.ValidationError("Brand not found with id: " + brandID);
        }
        const reportDishes = await DashboardRepository.getSumDishes(brandID);
        return res.json(ApiSuccess.getSelect("Report dishes", reportDishes));
    } catch (error) {
        return next(error);
    }
};
// tổng doanh thu của 1 tháng
exports.GetReportRevenue = async function (req, res, next) {
    try {
        const brandID = req.user.brandID;
        if (!brandID) {
            throw ApiError.ValidationError("Missing required field brandID");
        }
        const checkBrand = await CheckServices.checkBrand(brandID);
        if (!checkBrand) {
            throw ApiError.ValidationError("Brand not found with id: " + brandID);
        }
        const reportRevenue = await DashboardRepository.getPayDish1Month(brandID);
        return res.json(ApiSuccess.getSelect("Report revenue", reportRevenue.total_revenue));
    } catch (error) {
        return next(error);
    }
};