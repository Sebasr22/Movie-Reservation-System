'use strict';

const { getMoviesController, addMovieController, patchMovieController, deleteMovieController } = require('../controllers/movie.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { addMovieDataValidate, patchMovieDataValidate, deleteMovieDataValidate } = require('../validations/movie.data_validate');


const Router = require('express').Router();

/**
 * 
 * @version        :1.0.0
 * @description    :Obtener películas
 * @method         :GET
 * @type           :BODY
 * @returns
 * 
 */
Router.get('/v1/movie', getMoviesController);

/**
 * 
 * @version        :1.0.0
 * @description    :Agregar película
 * @method         :POST
 * @type           :BODY
 * @param {String} title - título de la película
 * @param {String} description - descripción de la película
 * @param {String} poster - poster de la película
 * @param {String} genre - género de la película
 * @returns
 * 
 */
Router.post('/v1/movie', verifyTokenMiddleware, addMovieDataValidate, addMovieController);

/**
 * 
 * @version        :1.0.0
 * @description    :Actualizar película
 * @method         :patch
 * @type           :BODY
 * @param {String} title - título de la película
 * @param {String} description - descripción de la película
 * @param {String} poster - poster de la película
 * @param {String} genre - género de la película
 * @returns
 * 
 */
Router.patch('/v1/movie/:id', verifyTokenMiddleware, patchMovieDataValidate, patchMovieController);

/**
 * 
 * @version        :1.0.0
 * @description    :Eliminar película
 * @method         :DELETE
 * @type           :PARAMS
 * @param {String} id - ID de la película a eliminar
 * @returns
 * 
 */
Router.delete('/v1/movie/:id', verifyTokenMiddleware, deleteMovieDataValidate, deleteMovieController);

module.exports = Router;
