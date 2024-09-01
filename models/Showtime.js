module.exports = (sequelize, DataTypes) => {
    const Showtime = sequelize.define('Showtime', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_movie: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Movies',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        showtime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        theater: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Showtime.associate = function(models) {
        Showtime.belongsTo(models.Movie, {
            foreignKey: 'id_movie',
            as: 'movie',
        });
        Showtime.hasMany(models.Reservation);
    };

    return Showtime;
};
