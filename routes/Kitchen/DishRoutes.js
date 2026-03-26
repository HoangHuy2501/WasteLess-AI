var express = require('express');
var router = express.Router();
var DishesController = require('../../controller/kitchen/DishesController');
/* GET users listing. */
router.post('/create-dishes-daily/:brandID', DishesController.CreateDishesOutput);
router.put('/update-dishes-leftover/:DailyDetailID', DishesController.UpdateDishesLeftoverOutput);
router.put('/update-dishes-output/:DailyDetailID', DishesController.UpdateDishesOutput);
module.exports = router;
