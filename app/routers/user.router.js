'use strict';

const { registerController, loginController, getUsersController, changeRoleController } = require('../controllers/user.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { registerDataValidate, loginDataValidate, changeRoleDataValidate } = require('../validations/user.data_validate');

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

/**
 * 
 * @version        :1.0.0
 * @description    :Obtener usuarios
 * @method         :GET
 * @type           :BODY
 * @returns
 * 
 */
Router.get('/v1/user', verifyTokenMiddleware, getUsersController);

/**
 * 
 * @version        :1.0.0
 * @description    :Cambiar rol de usuario (Solo un administrador puede cambiar el rol de un usuario)
 * @method         :PUT
 * @type           :BODY
 * @param {Number} idUser - Identificar del usuario al que se cambiara el rol
 * @param {Number} idRole - rol
 * @returns
 */
Router.put('/v1/user/role', verifyTokenMiddleware, changeRoleDataValidate, changeRoleController);

module.exports = Router;