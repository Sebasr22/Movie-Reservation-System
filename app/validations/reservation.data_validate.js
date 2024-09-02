'use strict';

const Joi = require('joi');
const { checkIfShowtimeIdExistService } = require('../services/showtime.service');
const { checkIfSeatsAvailableService } = require('../services/reservation.service');

module.exports = {

    createReservationDataValidate: async (req, res, next) => {
        const seatSchema = Joi.object({
            seatId: Joi.string().pattern(/^[A-J][1-9]|10$/).required()
        });

        const schema = Joi.object({
            showtimeId: Joi.number().integer().required(),
            seatsToReserve: Joi.array().items(seatSchema).min(1).required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
            return res.status(400).json({ errors });
        }

        // Verificar disponibilidad de asientos
        const { showtimeId, seatsToReserve } = req.body;
        const availableSeats = await checkIfSeatsAvailableService(showtimeId, seatsToReserve);

        if (!availableSeats) {
            return res.status(400).json({ message: 'Los asientos no están disponibles' });
        }

        // Verificar existencia del showtime
        const showtimeIdExist = await checkIfShowtimeIdExistService(showtimeId);

        if (!showtimeIdExist) {
            return res.status(400).json({ message: 'El showtime no existe' });
        }

        next();
    },



};