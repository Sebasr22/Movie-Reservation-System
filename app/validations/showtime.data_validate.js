'use strict';

const Joi = require('joi');
const { checkIfMovieExistService, checkIfShowtimeExistService, checkIfTheaterExistService, checkIfShowtimeOrTheaterExistService, checkIfShowtimeIdExistService } = require('../services/showtime.service');

module.exports = {

    addShowtimeDataValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                movieId: Joi.number().required(),
                showtime: Joi.date().required(),
                theater: Joi.string().required()
            });

            const { error } = await schema.validate(req.body);

            if (error) {
                const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
                return res.status(400).json({ errors });
            }

            // ==========================
            // ======= movieId ==========
            // ==========================

            // Verificar si el movieId es valido
            const movieExists = await checkIfMovieExistService(req.body.movieId);

            if (!movieExists) {
                return res.status(400).json({ message: 'La película no existe' });
            }

            // ==========================
            // ======= showtime =========
            // ==========================

            // Verificar si el showtime es valido
            const showtimeExists = await checkIfShowtimeExistService(req.body.movieId, req.body.showtime, req.body.theater);

            if (showtimeExists) {
                return res.status(400).json({ message: 'El showtime en este teatro ya existe para la misma película y horario.' });
            }

            // ==========================
            // ======= theater ==========
            // ==========================

            // Verificar si el showtime ya fue registrado en ese teatro
            // const theaterExists = checkIfTheaterExistService(req.body.movieId, req.body.showtime ,req.body.theater);

            next();

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    changeShowtimeDataValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                // movieId: Joi.number().required(),
                showtime: Joi.date().required(),
                theater: Joi.string().required()
            });

            const { error } = await schema.validate(req.body);

            if (error) {
                const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
                return res.status(400).json({ errors });
            }

            // ==========================
            // ========= Role ===========
            // ==========================

            // Verificar si el usuario tiene el rol de administrador

            const role = req.userData.role;

            if (role !== 'admin') {
                return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });
            }

            // ==========================
            // ======= movieId ==========
            // ==========================

            // Verificar si el movieId es valido
            const movieExists = await checkIfMovieExistService(req.body.movieId);

            if (!movieExists) {
                return res.status(400).json({ message: 'La película no existe' });
            }

            // ==========================
            // ======= showtime =========
            // ==========================

            // Verificar si el showtime es valido
            const showtimeExists = await checkIfShowtimeExistService(req.body.movieId, req.body.showtime, req.body.theater);

            if (showtimeExists) {
                return res.status(400).json({ message: 'El showtime en este teatro ya existe para la misma película y horario.' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    deleteShowtimeDataValidate: async (req, res, next) => {
        try {           
            
            // ==========================
            // ========= Role ===========
            // ==========================

            // Verificar si el usuario tiene el rol de administrador

            const role = req.userData.role;

            if (role !== 'admin') {
                return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });
            }

            // ==========================
            // ====== showtimeId ========
            // ==========================

            // Verificar si el showtimeId es valido

            const showtimeIdExists = await checkIfShowtimeIdExistService(req.params);

            if (!showtimeIdExists) {
                return res.status(400).json({ message: 'El showtimeId no existe' });
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    },



};