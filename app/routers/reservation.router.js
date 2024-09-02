'use strict';

const { getReservationsController, createReservationController } = require('../controllers/reservation.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { createReservationDataValidate } = require('../validations/reservation.data_validate');

const Router = require('express').Router();

/**
 * 
 * @version        :1.0.0
 * @description    :Obtener reservaciones
 * @method         :GET
 * @type           :BODY
 * @returns
 * 
 */
Router.get('/v1/reservation', getReservationsController);

/**
 * 
 * @version        :1.0.0
 * @description    :Crear reservaciones
 * @method         :POST
 * @type           :BODY
 * @returns
 * 
 */
Router.post('/v1/reservation', verifyTokenMiddleware, createReservationDataValidate, createReservationController);


module.exports = Router;
