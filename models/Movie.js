module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        posterImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Movie.associate = function (models) {
        Movie.hasMany(models.Showtime, {
            foreignKey: 'movieId',
            as: 'showtimes',
            onDelete: 'CASCADE',
        });
    };

    return Movie;
};
