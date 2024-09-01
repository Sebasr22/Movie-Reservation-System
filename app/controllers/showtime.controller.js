'use strict';

const { addShowtimeService, editShowtimeService, deleteShowtimeService } = require("../services/showtime.service");


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

    /**
     * 
     * @version        :1.0.0
     * @description    :Editar horario de una película
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    changeShowtimeController: async (req, res) => {
        try {
            const showtimeId = req.params
            const { movieId, showtime, theater } = req.body;

            const changeShowtime = await editShowtimeService(showtimeId, movieId, showtime, theater).catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ message: 'Horario actualizado correctamente', data: changeShowtime });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Eliminar horario de una película
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    deleteShowtimeController: async (req, res) => {
        try {
            const showtimeId = req.params;

            const deleteShowtime = await deleteShowtimeService(showtimeId).catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ message: 'Horario eliminado correctamente' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

};