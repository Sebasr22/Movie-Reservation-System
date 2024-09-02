'use strict';

const Joi = require('joi');
const fs = require('fs');

const allowedGenres = require('../../config/genres');
const { checkIfTitleExistService, checkIfIdMovieExistService } = require('../services/movie.service');



module.exports = {

    addMovieDataValidate: async (req, res, next) => {
        try {
            // Validar datos de la solicitud
            const schema = Joi.object({
                title: Joi.string().min(3).max(50).required(),
                description: Joi.string().min(3).max(500).required(),
                genre: Joi.string().min(3).max(30).required(),
            });
    
            const { error } = schema.validate(req.body);
    
            if (error) {
                // Si hay un archivo cargado, eliminarlo porque la validación falló
                if (req.file) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('Error al eliminar la imagen:', err);
                    });
                }
    
                const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
                return res.status(400).json({ errors });
            }
    
            // Verificar si el usuario es administrador
            const role = req.userData.role;
            if (role !== 'admin') {
                return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });
            }
    
            // Verificar si el título ya existe
            const titleExists = await checkIfTitleExistService(req.body.title);
            if (titleExists) {
                // Si hay un archivo cargado, eliminarlo
                if (req.file) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('Error al eliminar la imagen:', err);
                    });
                }
    
                return res.status(400).json({ message: 'El título ya existe' });
            }
    
            // Verificar si el género es válido
            function validateGenre(genre) {
                return allowedGenres.includes(genre);
            }
    
            if (!validateGenre(req.body.genre)) {
                // Si hay un archivo cargado, eliminarlo
                if (req.file) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('Error al eliminar la imagen:', err);
                    });
                }
    
                return res.status(400).json({ message: 'El género no es válido' });
            }
    
            next();
        } catch (error) {
            // Si hay un archivo cargado, eliminarlo en caso de error
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error al eliminar la imagen:', err);
                });
            }
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
            // ========== ADMIN ==========
            // ===========================

            // Verificar si el usuario es administrador
            const role = req.userData.role;

            if (role !== 'admin') {
                return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });
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

    deleteMovieDataValidate: async (req, res, next) => {
        try {

            // ===========================
            // ========== ADMIN ==========
            // ===========================

            // Verificar si el usuario es administrador
            const role = req.userData.role;

            if (role !== 'admin') {
                return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });
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

            next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

}