'use strict';

const fs = require('fs');
const { getMoviesService, addMovieService, patchMovieService, deleteMovieService } = require("../services/movie.service");

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Obtener peliculas
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    getMoviesController: async (req, res) => {
        try {

            const movies = await getMoviesService().catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ movies });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Agregar pelicula
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     *   
     */
    addMovieController: async (req, res) => {
        try {
            const { title, description, genre } = req.body;
            const poster_image = req.file ? `public/images/posters/${req.file.filename}` : null;
    
            const movie = await addMovieService(title, description, poster_image, genre).catch((error) => {
                throw new Error(error.message);
            });
    
            return res.status(200).json({ message: 'Película agregada correctamente', movie });
        } catch (error) {
            // Si se capturó un error y la imagen fue cargada, eliminarla
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error al eliminar la imagen:', err);
                });
            }
            return res.status(500).json({ message: error.message });
        }
    },
    
    /**
     * 
     * @version        :1.0.0
     * @description    :Actualizar pelicula
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    patchMovieController: async (req, res) => {
        try {

            const { id } = req.params;
            const { title, description, poster, genre } = req.body;

            const movie = await patchMovieService(id, title, description, poster, genre).catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ message: 'Película actualizada correctamente', movie });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Eliminar pelicula
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    deleteMovieController: async (req, res) => {
        try {

            const { id } = req.params;

            const movie = await deleteMovieService(id).catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ message: 'Película eliminada correctamente', movie });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },


}