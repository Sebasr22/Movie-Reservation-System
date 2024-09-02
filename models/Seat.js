module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define('Seat', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_showtime: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        version: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
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
