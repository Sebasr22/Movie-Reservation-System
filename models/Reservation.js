module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        seats: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        id_showtime: {
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
        Reservation.belongsTo(models.User, {
            foreignKey: 'id_user',
            as: 'user'
        });
        Reservation.belongsTo(models.Showtime, {
            foreignKey: 'id_showtime',
            as: 'showtime',
        });
    };

    return Reservation;
};
