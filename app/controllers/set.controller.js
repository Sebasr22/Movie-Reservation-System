'use strict';

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Obtener asientos disponibles
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    getSetsController: async (req, res) => {
        try {
            const seats = await getSetsService().catch((error) => {
                throw new Error(error.message);
            });
            return res.status(200).json({ message: 'Asientos disponibles', data: seats });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }

}