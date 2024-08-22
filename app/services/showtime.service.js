'use strict';

const { Movie, Showtime } = require('../../models');

module.exports = {

    /**
    *
    * @version        :1.0.0
    * @description    :Servicio para validar si existe una película
    * @param {String} movieId - id de la película
    * @returns
    *
    */
    async checkIfMovieExistService(_movieId) {
        try {
            if (!_movieId) throw new Error('Error, parámetro "_movieId" no proporcionado');

            const movie = await Movie.findByPk(_movieId);

            return movie ? true : false;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para validar si existe un horario
     * @param {String} showtime - horario
     * @returns
     * 
     */
    async checkIfShowtimeExistService(_movieId, _showtime, _theater) {
        try {
            if (!_movieId) throw new Error('Error, parámetro "_movieId" no proporcionado');
            if (!_showtime) throw new Error('Error, parámetro "_showtime" no proporcionado');
            if (!_theater) throw new Error('Error, parámetro "_theater" no proporcionado');

            const theaterCaptalize = _theater.charAt(0).toUpperCase() + _theater.slice(1);

            const showtime = await Showtime.findOne({
                where: {
                    movieId: _movieId,
                    showtime: _showtime,
                    theater: theaterCaptalize
                }
            });

            return showtime ? true : false;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para validar si existe un teatro //TODO: Revisar si hace falta
     * @param {String} theater - teatro
     * @returns
     * 
     */
    async checkIfTheaterExistService(_theater) {
        try {
            if (!_theater) throw new Error('Error, parámetro "_theater" no proporcionado');

            const showtime = await Showtime.findOne({ where: { theater: _theater } });

            return showtime ? true : false;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para agregar un horario
     * @param {String} movieId - id de la película
     * @param {String} showtime - horario
     * @param {String} theater - teatro
     * @returns
     * 
     */
    async addShowtimeService(_movieId, _showtime, _theater) {
        try {
            if (!_movieId) throw new Error('Error, parámetro "_movieId" no proporcionado');
            if (!_showtime) throw new Error('Error, parámetro "_showtime" no proporcionado');
            if (!_theater) throw new Error('Error, parámetro "_theater" no proporcionado');

            const theaterCaptalize = _theater.charAt(0).toUpperCase() + _theater.slice(1);

            const showtime = await Showtime.create({ movieId: _movieId, showtime: _showtime, theater: theaterCaptalize });

            return showtime;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para editar un horario
     * @param {String} movieId - id de la película
     * @param {String} showtime - horario
     * @param {String} theater - teatro
     * @returns
     * 
     */
    async changeShowtimeService(_movieId, _showtime, _theater) {
        try {
            if (!_movieId) throw new Error('Error, parámetro "_movieId" no proporcionado');
            if (!_showtime) throw new Error('Error, parámetro "_showtime" no proporcionado');
            if (!_theater) throw new Error('Error, parámetro "_theater" no proporcionado');

            const theaterCaptalize = _theater.charAt(0).toUpperCase() + _theater.slice(1);

            const showtime = await Showtime.update({
                showtime: _showtime,
                theater: theaterCaptalize
            }, { where: { movieId: _movieId } });

            return showtime;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para verificar si un showtimeId existe
     * @param {String} _showtimeId - id del horario
     * @returns
     * 
     */
    checkIfShowtimeIdExistService: async (_showtimeId) => {
        try {
            if (!_showtimeId) throw new Error('Error, parámetro "_showtimeId" no proporcionado');

            const idShowtime = _showtimeId.id;

            const showtime = await Showtime.findOne({ where: { id: idShowtime } });

            return showtime ? true : false;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para eliminar un horario
     * @param {String} _showtimeId - id del horario
     * @returns
     * 
     */
    deleteShowtimeService: async (_showtimeId) => {
        try {
            if (!_showtimeId) throw new Error('Error, parámetro "_showtimeId" no proporcionado');

            const idShowtime = _showtimeId.id;

            const showtime = await Showtime.destroy({ where: { id: idShowtime } });

            return showtime;
        } catch (error) {
            throw new Error(error.message);
        }
    },


};