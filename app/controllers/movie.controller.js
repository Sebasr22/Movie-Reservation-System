'use strict';

const { getMoviesService, addMovieService, patchMovieService } = require("../services/movie.service");

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

            const { title, description, poster, genre } = req.body;

            const movie = await addMovieService(title, description, poster, genre).catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ message: 'Película agregada correctamente', movie });
        } catch (error) {
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
    }





}