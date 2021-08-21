const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getAllRestaurants);
router.post('/search', restaurantController.searchRestaurant);
router.post('/', restaurantController.createRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);


module.exports = router;