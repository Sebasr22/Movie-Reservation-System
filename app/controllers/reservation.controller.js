'use strict';

const { getReservationsService, createReservationService } = require("../services/reservation.service");

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Obtener reservaciones
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    getReservationsController: async (req, res) => {
        try {
            const reservations = await getReservationsService().catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ reservations });
        } catch (error) {
            // console.log(error)
            return res.status(500).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Crear reservaciones
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    createReservationController: async (req, res) => {
        try {
            const idUser = req.userData.idUser;
            const { seatsToReserve, showtimeId } = req.body;

            const reservation = await createReservationService(idUser, seatsToReserve, showtimeId);
            return res.status(200).json({ message: 'Reservación creada', data: reservation });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },


};