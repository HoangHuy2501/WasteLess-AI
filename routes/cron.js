const cron = require('node-cron');
const CronServices = require("../services/CronServices");
const OperationDaily = async () => {
    cron.schedule('0 1 * * *', async () => {
    // cron.schedule('* * * * *', async () => {
        try {
            const result = await CronServices.OperationDaily();
            console.log('[CRON] Xong:', result);
        } catch (error) {
            console.log(error);
        }
    });
}
module.exports = { OperationDaily };