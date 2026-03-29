
const { AiAnalysisModel, AiAnalysisDetailModel, DishModel } = require('../models/index');
class AIRepository {
    async createAi_Analysis(data, brandID, options={}) {
        try {
             const createAi_Analysis = await AiAnalysisModel.create({...data,brand_id: brandID},{...options});
             return createAi_Analysis;
        } catch (error) {
            throw error;
        }
    }
    async createAi_Analysis_Detail(data, ai_analysis_id, options={}) {
        try {
             const createAi_Analysis_Detail = await AiAnalysisDetailModel.create({...data, analysis_id: ai_analysis_id },{...options});
             return createAi_Analysis_Detail;
        } catch (error) {
            throw error;
        }
    }
    // láy dữ liệu phân tích của AI theo brandID
    async getAi_Analysis_By_BrandID(brandID) {
        try {
             const getAi_Analysis_By_BrandID = await AiAnalysisModel.findAll({
                 where: { brand_id: brandID, date: new Date().toISOString().split('T')[0]},
                attributes: [],
                    include: [{
                    model: AiAnalysisDetailModel,
                    attributes: ['id',"recommended_quantity","predicted_waste_quantity","suggestion_note"],
                    include: [{
                        model: DishModel,
                        attributes: ['name']
                    }]
                }]
                });
             return getAi_Analysis_By_BrandID;
        } catch (error) {
            throw error;
        }
    }
    // lấy dữ liệu phân tích của AI về số lượng khách hàng theo ngày
    async getAi_Analysis_Customer_By_BrandID(brandID) {
        try {
             const getAi_Analysis_Customer_By_BrandID = await AiAnalysisModel.findAll({
                 where: { brand_id: brandID, date: new Date().toISOString().split('T')[0]},
                attributes: ['id', 'date', 'ai_customer_count',"summary","risk_level"],
                });
             return getAi_Analysis_Customer_By_BrandID;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AIRepository();