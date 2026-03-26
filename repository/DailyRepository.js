
const { DailyOperationModel, DailyDetailModel } = require("../models/index");
const sequelize  = require("../config/connectData");
class DailyRepository {
    async DailyOperation(brandID) {
        return await DailyOperationModel.create({ brand_id: brandID, operation_date: sequelize.literal('CURRENT_DATE'), customer_count: 0 });
    }
    async TakeIDOperation(brandID) {
        const today = new Date().toISOString().split('T')[0];
        const operation = await DailyOperationModel.findOne({
            where: {
                brand_id: brandID,
                operation_date: today
            }
        });
        return operation.id;
    }
    // lấy chi tiết daily detail
    async GetDishesOutputByID(id){
        return await DailyDetailModel.findByPk(id);
    }
    // tạo daily_detail
    async CreateDishesOutput(data, dailyID){
        return await DailyDetailModel.create({ daily_id: dailyID, dishes_id: data.dishes_id, quantity_prepared: data.quantity_prepared, revenue_cost: data.revenue_cost });
    }
    // cập nhập món dư
    async UpdateDishesLeftoverOutput(data, DailyDetailID){
        return await DailyDetailModel.update({ quantity_wasted: data.quantity_wasted, waste_cost: data.wasted_cost, revenue_cost: data.revenue_cost }, { where: { id: DailyDetailID } });
    }
    // cập nhập món ra khi có món dư
    async UpdateDishesOutput(data, DailyDetailID){
        return await DailyDetailModel.update({ quantity_prepared: data.quantity_prepared, revenue_cost: data.revenue_cost }, { where: { id: DailyDetailID } });
    }
}

module.exports = new DailyRepository();