'use strict';

const { sequelize, Movie, Showtime, Seat } = require('../../models');

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
                    id_movie: _movieId,
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
        const transaction = await sequelize.transaction(); // Iniciar una transacción
        try {
            if (!_movieId) throw new Error('Error, parámetro "_movieId" no proporcionado');
            if (!_showtime) throw new Error('Error, parámetro "_showtime" no proporcionado');
            if (!_theater) throw new Error('Error, parámetro "_theater" no proporcionado');

            const theaterCaptalize = _theater.charAt(0).toUpperCase() + _theater.slice(1);

            // Crear el Showtime dentro de la transacción
            const showtime = await Showtime.create(
                { id_movie: _movieId, showtime: _showtime, theater: theaterCaptalize },
                { transaction }
            );

            // Crear los asientos en formato JSON
            const totalRows = 10; // Ejemplo de filas en el cine (A-J)
            const seatsPerRow = 10; // Ejemplo de asientos por fila (1-10)

            let seats = {};

            for (let row = 0; row < totalRows; row++) {
                // Convertir el índice de la fila a una letra (A, B, C, etc.)
                const rowLetter = String.fromCharCode(65 + row); // 65 es el código ASCII para 'A'
                seats[rowLetter] = [];

                for (let seat = 1; seat <= seatsPerRow; seat++) {
                    // Asignar cada asiento en la fila correspondiente con un estado de 'available'
                    seats[rowLetter].push({
                        seatId: `${rowLetter}${seat}`,
                        reserved: false
                    });
                }
            }

            // Guardar los asientos en la tabla Seat dentro de la transacción
            await Seat.create(
                { id_showtime: showtime.id, seats },
                { transaction }
            );

            // Confirmar la transacción
            await transaction.commit();

            return showtime;
        } catch (error) {
            // Revertir la transacción en caso de error
            await transaction.rollback();
            console.log(error);
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
    async editShowtimeService(_showtimeId, _movieId, _showtime, _theater) { 
        try {
            if (!_showtime) throw new Error('Error, parámetro "_showtime" no proporcionado');

            const theaterCaptalize = _theater.charAt(0).toUpperCase() + _theater.slice(1);

            const showtimeIdToEdit = _showtimeId.id;

            const showtimeToEdit = await Showtime.findByPk(showtimeIdToEdit);

            if (_movieId) showtimeToEdit.id_movie = _movieId;
            if (_showtime) showtimeToEdit.showtime = _showtime;
            if (_theater) showtimeToEdit.theater = theaterCaptalize;

            await showtimeToEdit.save();

            return showtimeToEdit;
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

            const showtime = await Showtime.findByPk(idShowtime);

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