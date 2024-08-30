'use strict';

const { Seat } = require("../../models");

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para obtener todos los asientos de todos los showtimes disponibles.
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async getSetsService() {
        try {
            return await Seat.findAll();
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para verificar si existen asientos para un showtime.
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async checkIfShowtimeIdSeatsExistService(_showtimeId) {
        try {
            if (!_showtimeId) throw new Error('Error, parámetro "_showtimeId" no proporcionado');

            const seats = await Seat.findOne({
                where: {
                    showtimeId: _showtimeId.id
                }
            });
            return seats ? true : false;
        } catch (error) {
            // console.log(error);
            throw new Error(error.message);
        }
    },

    async getSetsByIdService(_showtimeId) {
        try {
            if (!_showtimeId) throw new Error('Error, parámetro "_showtimeId" no proporcionado');

            const seats = await Seat.findOne({
                where: {
                    showtimeId: _showtimeId.id
                }
            });

            return seats;
        } catch (error) {
            // console.log(error);
            throw new Error(error.message);
        }
    },
};