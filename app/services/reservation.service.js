'use strict';

const { Sequelize, Transaction } = require('sequelize');
const { sequelize } = require('../../config/db');
const { Reservation, Seat } = require('../../models');

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para obtener todas las reservaciones
     * @returns
     * 
     */
    async getReservationsService() {
        try {
            return await Reservation.findAll();
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para crear una reservación
     * @param {Number} idUser - id del usuario
     * @param {Object} seats - asientos
     * @param {Number} showtimeId - id del showtime
     * @returns
     * 
     */
    async createReservationService(idUser, seatsToReserve, showtimeId) {
        const transaction = await sequelize.transaction();
        try {

            if (!idUser) throw new Error('Error, parámetro "idUser" no proporcionado');
            if (!showtimeId) throw new Error('Error, parámetro "showtimeId" no proporcionado');
            if (!seatsToReserve) throw new Error('Error, parámetro "seatsToReserve" no proporcionado');

            // Obtener los datos actuales de los asientos
            const seatData = await Seat.findOne({
                where: { id_showtime: showtimeId },
                transaction
            });

            if (!seatData) {
                throw new Error('Showtime no encontrado');
            }

            let seats = seatData.seats;

            // Verificar disponibilidad de los asientos
            for (const seat of seatsToReserve) {
                const row = seat.seatId[0];
                const seatId = seat.seatId;
                const seatRow = seats[row];

                if (!seatRow) {
                    throw new Error(`Fila de asiento inválida: ${row}`);
                }

                const seatEntry = seatRow.find(s => s.seatId === seatId);

                if (!seatEntry) {
                    throw new Error(`Asiento inválido: ${seat.seatId}`);
                }

                if (seatEntry.reserved) {
                    throw new Error(`El asiento ${seat.seatId} ya está reservado`);
                }
            }

            // Marcar asientos como reservados
            for (const seat of seatsToReserve) {
                const row = seat.seatId[0];
                const seatId = seat.seatId;
                const seatRow = seats[row];

                if (seatRow) {
                    const seatEntry = seatRow.find(s => s.seatId === seatId);
                    if (seatEntry) {
                        seatEntry.reserved = true;
                    } else {
                        throw new Error(`Asiento no encontrado durante la actualización: ${seat.seatId}`);
                    }
                } else {
                    throw new Error(`Fila no encontrada durante la actualización: ${row}`);
                }
            }

            // Guardar cambios en los asientos
            await Seat.update(
                { seats: seats, version: seatData.version + 1 },
                {
                    where: { id_showtime: showtimeId, version: seatData.version },
                    transaction
                }
            );

            // Crear la reservación en la base de datos
            const reservationCreated = await Reservation.create({
                id_user: idUser,
                id_showtime: showtimeId,
                seats: seatsToReserve.map(seat => seat.seatId)
            }, { transaction });

            await transaction.commit();

            return reservationCreated;
        } catch (error) {
            await transaction.rollback();

            // Manejo de errores específico para usuarios
            if (error.message.includes('Showtime no encontrado')) {
                throw new Error('El horario seleccionado no está disponible.');
            }
            if (error.message.includes('El asiento ya está reservado')) {
                throw new Error('Uno o más asientos que intentas reservar ya están ocupados.');
            }

            if (error.name === 'SequelizeOptimisticLockError') {
                throw new Error('Tu reserva no se pudo completar porque los asientos ya han sido reservados por otro usuario. Por favor, vuelve a intentarlo.');
            }

            console.error(error);
            throw new Error('Hubo un error al procesar tu reserva. Por favor, inténtalo de nuevo.');
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para verificar si existen asientos para un showtime.
     * @param {Number} _showtimeId - id del showtime
     * @param {Array} _seats - asientos
     * @returns
     * 
     */
    async checkIfSeatsAvailableService(_showtimeId, _seatsToReserve) {
    try {
        // Obtener los datos actuales de los asientos
        const seatData = await Seat.findOne({ where: { id_showtime: _showtimeId } });

        if (!seatData) {
            return false; // Showtime no encontrado
        }

        const seats = seatData.seats;

        // Verificar disponibilidad de los asientos
        for (const seat of _seatsToReserve) {
            const seatId = seat.seatId;
            const row = seatId[0]; // Obtener la fila (letra)
            const seatNumber = seatId.slice(1); // Obtener el número del asiento

            const seatRow = seats[row];

            if (!seatRow) {
                return false; // Fila de asiento inválida
            }

            const seatEntry = seatRow.find(s => s.seatId === seatId);

            if (!seatEntry || seatEntry.reserved) {
                return false; // Asiento inválido o ya reservado
            }
        }

        return true; // Todos los asientos están disponibles
    } catch (error) {
        console.error(error);
        throw error;
    }
},


};