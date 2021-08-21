const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');
const limits = require('../middlewares/reservationsLimit');

router.get('/', reservationController.getAllReservations);
router.post('/', limits.limitDay, limits.limitRestaurant, reservationController.createReservation);


module.exports = router;