'use strict';

const Joi = require('joi');

const allowedGenres = require('../../config/genres');
const { checkIfTitleExistService, checkIfIdMovieExistService } = require('../services/movie.service');



module.exports = {

    addMovieDataValidate: async (req, res, next) => {
        try {

            const schema = Joi.object({
                title: Joi.string().min(3).max(50).required(),
                description: Joi.string().min(3).max(500).required(),
                poster: Joi.string().min(3).max(100),
                genre: Joi.string().min(3).max(30).required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
                return res.status(400).json({ errors });
            }

            // ===========================
            // ========== ADMIN ==========
            // ===========================

            // Verificar si el usuario es administrador
            const role = req.userData.role;

            if (role !== 'admin') {
                return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });
            }

            // ===========================
            // ========== Title ==========
            // ===========================

            // Verificar si el título ya existe
            const titleExists = await checkIfTitleExistService(req.body.title);

            if (titleExists) {
                return res.status(400).json({ message: 'El título ya existe' });
            }

            // ===========================
            // ========== genre =========
            // ===========================

            // Verificar si el género es válido
            function validateGenre(genre) {
                return allowedGenres.includes(genre);
            }

            if (!validateGenre(req.body.genre)) {
                return res.status(400).json({ message: 'El género no es válido' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    patchMovieDataValidate: async (req, res, next) => {
        try {

            const schema = Joi.object({
                title: Joi.string().min(3).max(50),
                description: Joi.string().min(3).max(500),
                poster: Joi.string().min(3).max(100),
                genre: Joi.string().min(3).max(30),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
                return res.status(400).json({ errors });
            }

            // ===========================
            // ========== ID =============
            // ===========================
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'El ID es requerido' });
            }

            const validIdMovie = await checkIfIdMovieExistService(id);

            if (!validIdMovie) {
                return res.status(400).json({ message: 'El ID de la película no existe' });
            }

            // ===========================
            // ========== ADMIN ==========
            // ===========================

            // Verificar si el usuario es administrador
            const role = req.userData.role;

            if (role !== 'admin') {
                return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });
            }

            // ===========================
            // ========== Title ==========
            // ===========================

            // Verificar si el título ya existe
            if (req.body.title) {
                const titleExists = await checkIfTitleExistService(req.body.title);

                if (titleExists) {
                    return res.status(400).json({ message: 'El título ya existe' });
                }
            }

            // ===========================
            // ========== genre =========
            // ===========================

            // Verificar si el género es válido
            function validateGenre(genre) {
                return allowedGenres.includes(genre);
            }

            if (req.body.genre && !validateGenre(req.body.genre)) {
                return res.status(400).json({ message: 'El género no es válido' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },





}