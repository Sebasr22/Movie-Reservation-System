'use strict';
const { addShowtimeController, changeShowtimeController, deleteShowtimeController } = require('../controllers/showtime.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { addShowtimeDataValidate, changeShowtimeDataValidate, deleteShowtimeDataValidate } = require('../validations/showtime.data_validate');

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

/**
 * 
 * @version        :1.0.0
 * @description    :Editar horario de una película
 * @method         :PUT
 * @type           :BODY
 * @param {String} movieId - id de la película
 * @param {String} showtime - Horario de la película
 * @param {String} theater - Teatro de la película
 * @returns
 * 
 */
Router.put('/v1/showtime', verifyTokenMiddleware, changeShowtimeDataValidate, changeShowtimeController);

/**
 * 
 * @version        :1.0.0
 * @description    :Eliminar horario de una película
 * @method         :DELETE
 * @type           :BODY
 * @param {String} movieId - id de la película
 * @param {String} showtimeId - id del horario 
 */
Router.delete('/v1/showtime/:id', verifyTokenMiddleware, deleteShowtimeDataValidate, deleteShowtimeController);

module.exports = Router;