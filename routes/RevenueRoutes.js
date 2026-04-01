var express = require('express');
var router = express.Router();
const RevenueController = require('../controller/RevenueController');
/* GET users listing. */
router.get('/sum-revenue-by-month', RevenueController.SumRevenueByMonth);
router.get('/sum-revenue-yesterday', RevenueController.SumRevenueYesterday);
router.get("/sum-revenue-transaction-by-month", RevenueController.TransactionByMonth);

module.exports = router;