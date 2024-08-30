'use strict';

const Joi = require('joi');
const { checkIfShowtimeIdSeatsExistService } = require('../services/seat.service');

module.exports = {

    getSetsbyIdDataValidate: async (req, res, next) => {
        try {
            
            // ===========================
            // ======= showtimeId ========
            // ===========================

            const showtimeId = req.params;

            const showtimeIdExist = await checkIfShowtimeIdSeatsExistService(showtimeId).catch((error) => {
                throw new Error(error.message);
            });

            if (!showtimeIdExist) {
                return res.status(400).json({ message: 'El showtime no existe' }); 
            }

            next();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

};