'use strict';

const { registerController } = require('../controllers/user.controller');
const { registerDataValidate, loginDataValidate } = require('../validations/user.data_validate');

const Router = require('express').Router();

/**
 *
 * @version        :1.0.0
 * @description    :Registro
 * @method         :POST
 * @type           :BODY
 * @param {String} username - nombre de usuario
 * @param {String} password - contraseña
 * @param {String} confirmPassword - confirmar contraseña
 * @param {String} email - correo 
 * @param {String} name - nombre
 * @param {String} lastname - apellido
 * @returns
 *
 */

Router.post('/v1/user/register', registerDataValidate, registerController);

/**
 * 
 * @version        :1.0.0
 * @description    :Iniciar sesión
 * @method         :POST
 * @type           :BODY
 * @param {String} username - nombre de usuario
 * @param {String} password - contraseña
 * @returns
 * 
 */
Router.post('/v1/user/login', loginDataValidate, loginController);

module.exports = Router;