const { body, validationResult } = require('express-validator');

const db = require('../db/index');
const ApiResponse = require('../utils/response');


exports.getAllReservations = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM reservations INNER JOIN restaurants ON reservations.restaurant_id = restaurants.id ORDER BY date');

        res.json(new ApiResponse({ data: rows }));
    } catch (e) {
        console.log(e);
        res.status(500).json(new ApiResponse({ error: e.message }));
    }
};

exports.createReservation = [
    body('reserved_by').not().isEmpty().trim().escape(),
    body('restaurant_id').not().isEmpty().isNumeric(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json(new ApiResponse({ error: errors.array() }));
        }

        try {
            const { rows } = await db.query('INSERT INTO reservations(reserved_by, restaurant_id, date) VALUES($1, $2, $3) RETURNING *', [req.body.reserved_by, req.body.restaurant_id, req.body.date]);

            res.json(new ApiResponse({ data: rows }));
        } catch (e) {
            console.log(e.message);
            res.status(500).json(new ApiResponse({ error: 'Something went wrong, please try again' }));
        }
    }
];