
const { DishModel, DailyOperationModel, DailyDetailModel} = require('../models/index');
    const { Op, fn, col } = require('sequelize');
class DashboardRepository {

    // tổng số lượng món ăn, tổng số đang phục vụ, tổng số đang đợi
    async getSumDishes(brandID) {
        const totalDishes = await DishModel.count({ where: { brand_id: brandID } });
        const totalServingDishes = await DishModel.count({ where: { brand_id: brandID, status: true } });
        const totalWaitingDishes = await DishModel.count({ where: { brand_id: brandID, status: false } });
        return {
            totalDishes,
            totalServingDishes,
            totalWaitingDishes
        }
    }
    // tổng số món ăn đã bán được trong tháng hiện tại


    async getPayDish1Month(brandID) {
    const now = new Date();

    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const result = await DailyDetailModel.findOne({
        attributes: [
            [fn('SUM', col('revenue_cost')), 'total_revenue'],
            [fn('SUM', col('waste_cost')), 'total_waste_cost'],
            [fn('SUM', col('quantity_prepared')), 'total_prepared'],
            [fn('SUM', col('quantity_wasted')), 'total_wasted']
        ],
        include: [
            {
                model: DailyOperationModel,
                required: true,
                attributes: [],
                where: {
                    brand_id: brandID,
                    operation_date: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    }
                }
            }
        ],
        raw: true
    });

    return result;
}
}

module.exports = new DashboardRepository();