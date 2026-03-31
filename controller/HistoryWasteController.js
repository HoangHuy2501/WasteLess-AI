const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");
const DailyRepository = require("../repository/DailyRepository");
const AIRepository = require("../repository/AIRepository");
const { log } = require("winston");
//tổng món ăn lãng phí trong 1 tháng
exports.SumWasteByMonth = async (req, res, next) => {
  try {
    const brandID = req.user.brandID;
    const result = await DailyRepository.SumWasteByMonth(brandID);
    return res.json(ApiSuccess.getSelect("Sum waste by month", result));
  } catch (error) {
    return next(error);
  }
};
//tỉ lệ lãng phí giữa 2 tháng (hiện tại và tháng trước)
exports.SumWasteByMonthCompare = async (req, res, next) => {
  try {
    const brandID = req.user.brandID;
    const prev = new Date();
    prev.setMonth(prev.getMonth() - 1);

    const month = {
      year: prev.getFullYear(),
      month: prev.getMonth(),
    };
    const Current = await DailyRepository.SumWasteByMonth(brandID);
    const Previous = await DailyRepository.SumWasteByMonth(brandID, month);
    console.log("Current", Current.total_waste);
    console.log("Previous", Previous.total_waste);

    let result =
      (Number(Current.total_waste) / Number(Previous.total_waste)) * 100;
    if (Number(Current.total_waste) > Number(Previous.total_waste)) {
      result = "+" + result;
    } else if (
      Number(Previous.total_waste) === null &&
      Number(Current.total_waste) > 0
    ) {
      result = "+" + "100";
    } else if (
      Number(Current.total_waste) === null &&
      Number(Previous.total_waste) > 0
    ) {
      result = "-" + "100";
    } else if (Number(Current.total_waste) < Number(Previous.total_waste)) {
      result = "-" + result;
    } else {
      result = "0";
    }
    return res.json(ApiSuccess.getSelect("Sum waste by month compare", result));
  } catch (error) {
    return next(error);
  }
};
// danh sách lãng phí món ăn
exports.ListWasteByIngredient = async (req, res, next) => {
  try {
    const brandID = req.user.brandID;

    const resultAI =
      await AIRepository.getAi_Analysis_Waste_By_BrandID(brandID);
    console.log("ai", JSON.stringify(resultAI || [], null, 2));

    const resultDaily = await DailyRepository.ListWasteByIngredient(brandID);

    const aiMap = {};

    // Tạo map AI theo date + dish_name
    resultAI.forEach((aiRecord) => {
      const date = aiRecord.date;
      if (!date) return;

      // AiAnalysisDetails là mảng (từ hasMany relationship)
      if (
        Array.isArray(aiRecord.AiAnalysisDetails) &&
        aiRecord.AiAnalysisDetails.length > 0
      ) {
        aiRecord.AiAnalysisDetails.forEach((detail) => {
          // DishModel là object nested
          const dishName = detail?.DishModel?.name ?? null;
          if (!dishName) return;

          const key = `${date}__${dishName}`;

          aiMap[key] = {
            predicted_waste_quantity: detail?.predicted_waste_quantity ?? null,
            suggestion_note: detail?.suggestion_note ?? null,
          };
        });
      }
    });

    // Lấy resultDaily làm chuẩn
    const result = resultDaily
      .filter(
        (record) =>
          record &&
          record["daily_operation.operation_date"] &&
          record["dish.name"],
      )
      .map((dailyRecord) => {
        const date = dailyRecord["daily_operation.operation_date"];
        const dishName = dailyRecord["dish.name"];
        const key = `${date}__${dishName}`;
        const aiData = aiMap[key] || null;

        return {
          date,
          dish_name: dishName,
          quantity_prepared: Number(dailyRecord.quantity_prepared) || 0,
          quantity_used: Number(dailyRecord.quantity_used) || 0,
          quantity_wasted: Number(dailyRecord.quantity_wasted) || 0,
          waste_percentage: parseFloat(dailyRecord.waste_percentage) || 0,
          waste_cost: Number(dailyRecord.waste_cost) || 0,
          predicted_waste_quantity: aiData?.predicted_waste_quantity ?? null,
          suggestion_note: aiData?.suggestion_note ?? null,
        };
      })
      .sort((a, b) => {
        const dateCompare = new Date(b.date) - new Date(a.date);
        if (dateCompare !== 0) return dateCompare;
        return (a.dish_name || "").localeCompare(b.dish_name || "");
      });

    return res.json(ApiSuccess.getSelect("List waste by ingredient", result));
  } catch (error) {
    return next(error);
  }
};
