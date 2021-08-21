const { body, validationResult } = require('express-validator');

const db = require('../db/index');
const ApiResponse = require('../utils/response');

exports.createRestaurant = [
    body('name').not().isEmpty().trim().escape(),
    body('direction').not().isEmpty().trim().escape(),
    body('description').not().isEmpty().trim().escape(),
    body('city').not().isEmpty().trim().escape(),
    body('url_photo').not().isEmpty().isURL().trim(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json(new ApiResponse({ error: errors.array() }));
        }

        const { rows } = await db.query('INSERT INTO restaurants(name, direction, description, city, url_photo) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [req.body.name, req.body.direction, req.body.description, req.body.city, req.body.url_photo]);

        res.json(new ApiResponse({ data: rows }));
    }
];

exports.getAllRestaurants = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM restaurants ORDER BY name, city');

    res.json(new ApiResponse({ data: rows }));
};


exports.deleteRestaurant = async (req, res) => {
    const { rows } = await db.query('DELETE FROM restaurants WHERE id = $1', [req.params.id]);

    res.json(new ApiResponse({ data: 'Done!' }));
};

exports.searchRestaurant = [
    body('text').not().isEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse({ error: errors.array() }));
        }

        const { rows } = await db.query(`SELECT * FROM restaurants WHERE UPPER(name) LIKE UPPER('${req.body.text}%')`);

        res.json(new ApiResponse({ data: rows }));
    }
]