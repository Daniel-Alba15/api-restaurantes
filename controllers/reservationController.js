const { body, validationResult } = require('express-validator');

const db = require('../db/index');
const ApiResponse = require('../utils/response');


exports.getAllReservations = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM reservations INNER JOIN restaurants ON reservations.restaurant_id = restaurants.id');

    res.json(new ApiResponse({ data: rows }));
};

exports.createReservation = [
    body('reserved_by').not().isEmpty().trim().escape(),
    body('restaurant_id').not().isEmpty().isNumeric(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json(new ApiResponse({ error: errors.array() }));
        }

        const { rows } = await db.query('INSERT INTO reservations(reserved_by, restaurant_id) VALUES($1, $2) RETURNING *', [req.body.reserved_by, req.body.restaurant_id]);

        res.json(new ApiResponse({ data: rows }));
    }
];