module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define('Seat', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        seats: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
    });

    Seat.associate = function(models) {
        Seat.belongsTo(models.Showtime, {
            foreignKey: 'id_showtime',
            as: 'showtime',
        });
    };

    return Seat;
};
