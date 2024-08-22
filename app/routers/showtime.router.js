'use strict';
const { addShowtimeController } = require('../controllers/showtime.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { addShowtimeDataValidate } = require('../validations/showtime.data_validate');

   

const Router = require('express').Router();

/**
 * 
 * @version        :1.0.0
 * @description    :Crear horario para una película
 * @method         :POST
 * @type           :BODY
 * @param {String} movieId - id de la película
 * @param {String} showtime - Horario de la película
 * @param {String} theater - Teatro de la película
 * @returns
 * 
 */
Router.post('/v1/showtime', verifyTokenMiddleware, addShowtimeDataValidate, addShowtimeController);

module.exports = Router;