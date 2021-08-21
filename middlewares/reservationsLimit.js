const db = require('../db/index');
const ApiResponse = require('../utils/response');


exports.limitDay = async (req, res, next) => {
    const { rows } = await db.query('SELECT COUNT(id) FROM reservations WHERE date = $1', [new Date().toLocaleDateString()]);

    if (rows[0].count >= 20) {
        return res.status(403).json(new ApiResponse({ error: "No se pueden hacer mas reservaciones por hoy" }));
    }

    next();
};

exports.limitRestaurant = async (req, res, next) => {
    if (req.body.date === undefined) {
        req.body.date = new Date().toLocaleDateString();
    }

    const { rows } = await db.query('SELECT COUNT(id) FROM reservations WHERE date = $1 and restaurant_id = $2', [req.body.date, req.body.restaurant_id]);

    if (rows[0].count >= 15) {
        return res.status(403).json(new ApiResponse({ error: "No se pueden hacer mas reservaciones en este restaurante por hoy" }));
    }

    next();
};