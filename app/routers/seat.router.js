'use strict';

const { getSetsController, getSetsbyIdController } = require('../controllers/set.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { getSetsbyIdDataValidate } = require('../validations/seat.data_validate');

const Router = require('express').Router();

// /**
//  * 
//  * @version        :1.0.0
//  * @description    :Obtener asientos disponibles
//  * @method         :GET
//  * @type           :BODY
//  * @returns
//  * 
//  */
Router.get('/v1/seat', getSetsController);

/**
 * 
 * @version        :1.0.0
 * @description    :Obtener asientos disponibles de un showtime en especifico
 * @method         :GET
 * @type           :BODY
 * @returns
 * 
 */
Router.get('/v1/seat/:id', verifyTokenMiddleware, getSetsbyIdDataValidate, getSetsbyIdController);

module.exports = Router;