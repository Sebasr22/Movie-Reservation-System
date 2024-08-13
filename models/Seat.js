// models/Seat.js
module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define('Seat', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        seatNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    });

    Seat.associate = function(models) {
        Seat.belongsTo(models.Showtime);
    };

    return Seat;
};
