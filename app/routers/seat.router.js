'use strict';

const Router = require('express').Router();

/**
 * 
 * @version        :1.0.0
 * @description    :Obtener asientos disponibles
 * @method         :GET
 * @type           :BODY
 * @returns
 * 
 */
Router.get('/v1/seat', getSetsController);