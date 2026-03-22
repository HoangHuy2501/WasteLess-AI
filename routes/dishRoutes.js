var express = require('express');
var router = express.Router();
var DishesController = require('../controller/DishesController');
const authorize = require('../middleware/authorize');
/* GET users listing. */
router.post('/create-dishes/:brandID/:userID', DishesController.CreateDishes);
router.put('/update-dishes/:DishID', authorize(["Manager", "Admin"]), DishesController.UpdateDishes);
router.delete('/delete-dishes/:DishID', authorize(["Manager", "Admin"]), DishesController.DeleteDishes);
router.get('/get-all-dishes-false', authorize(["Manager", "Admin"]), DishesController.GetAllDishesFalse);
router.put('/approve-dishes/:DishID', authorize(["Manager", "Admin"]), DishesController.ApproveDishes);
module.exports = router;
