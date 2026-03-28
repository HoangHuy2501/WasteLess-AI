var express = require('express');
var router = express.Router();
const DashboardController = require('../controller/DashboardManagerController');
const authorize = require('../middleware/authorize');
/* GET users listing. */
router.get('/get-sum-dishes', authorize(["Manager"]), DashboardController.GetReportDishes);
router.get('/get-sum-revenue', authorize(["Manager"]), DashboardController.GetReportRevenue);
module.exports = router;