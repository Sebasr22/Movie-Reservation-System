'use strict';

const { addShowtimeService } = require("../services/showtime.service");


module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Crear horario para una película
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    addShowtimeController: async (req, res) => {
        try {

            const { movieId, showtime, theater } = req.body;

            const createShowtime = await addShowtimeService(movieId, showtime, theater).catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ message: 'Horario agregado correctamente', data: createShowtime });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },


};