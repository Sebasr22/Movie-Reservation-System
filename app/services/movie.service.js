'use strict';


const { Movie } = require('../../models');

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para obtener todas las peliculas
     * @returns
     * 
     */
    async getMoviesService() {
        try {
            return await Movie.findAll();;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para verificar si existe una película
     * @param {String} _title - título de la película
     * @returns
     * 
     */
    async checkIfTitleExistService(_title) {
        try {
            if (!_title) throw new Error('Error, parámetro "_title" no proporcionado');

            const movie = await Movie.findOne({
                where: {
                    title: _title
                }
            });

            return movie ? true : false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para agregar una película
     * @param {String} _title - título de la película
     * @param {String} _description - descripción de la película
     * @param {String} _poster - poster de la película
     * @param {String} _genre - género de la película
     * @returns
     * 
     */
    async addMovieService(_title, _description, _poster, _genre) {
        try {
            if (!_title) throw new Error('Error, parámetro "_title" no proporcionado');
            if (!_description) throw new Error('Error, parámetro "_description" no proporcionado');
            if (!_genre) throw new Error('Error, parámetro "_genre" no proporcionado');

            const movie = await Movie.create({
                title: _title,
                description: _description,
                poster: _poster,
                genre: _genre
            });

            return movie;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para verificar que el id de la película exista
     * @param {String} _id - id de la película
     * @returns
     * 
     */
    async checkIfIdMovieExistService(_id) {
        try {
            if (!_id) throw new Error('Error, parámetro "_id" no proporcionado');

            const movie = await Movie.findByPk(_id);

            return movie ? true : false;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para actualizar una película
     * @param {String} _title - título de la película
     * @param {String} _description - descripción de la película
     * @param {String} _poster - poster de la película
     * @param {String} _genre - género de la película
     * @returns
     * 
     */
    async patchMovieService(_id, _title, _description, _poster, _genre) {
        try {

            if (!_id) throw new Error('Error, parámetro "_id" no proporcionado');

            const movie = await Movie.findByPk(_id);

            if (!movie) throw new Error('Error, la película no existe');

            if (_title) movie.title = _title;
            if (_description) movie.description = _description;
            if (_poster) movie.poster = _poster;
            if (_genre) movie.genre = _genre;

            await movie.save();

            return movie;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}