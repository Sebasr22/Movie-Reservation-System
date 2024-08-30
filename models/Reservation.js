module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        seatId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Seats',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        showtimeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Showtimes',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    });

    Reservation.associate = function(models) {
        Reservation.belongsTo(models.User);
        Reservation.belongsTo(models.Seat);
        Reservation.belongsTo(models.Showtime);
    };

    return Reservation;
};
