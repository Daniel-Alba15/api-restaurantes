require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const restaurantRouter = require('./routes/restaurants');
const reservationRouter = require('./routes/reservations');


const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/restaurant', restaurantRouter);
app.use('/api/reservation', reservationRouter);


module.exports = app;