'use strict';

const Seat = require("../../models/Seat");

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
    getSetsService: async () => {
        try {
            return await Seat.findAll({
                include: 'showtimes'
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

};