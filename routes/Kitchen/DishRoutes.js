var express = require('express');
var router = express.Router();
var DishesController = require('../../controller/kitchen/DishesController');

router.post('/create-dishes-new/:brandID', DishesController.CreateDishesForKitchen);
router.post('/create-dishes-daily/:brandID', DishesController.CreateDishesOutput);
router.put('/update-dishes-leftover/:DailyDetailID', DishesController.UpdateDishesLeftoverOutput);
router.put('/update-dishes-output/:DailyDetailID', DishesController.UpdateDishesOutput);
router.get('/get-dishes-output/:brandID', DishesController.GetDishesOutputByDate);
module.exports = router;
