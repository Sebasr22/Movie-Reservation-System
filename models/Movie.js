// models/Movie.js
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

    //TODO: Esto se cambio pero no se actualizo en la BD, verificar si funciona, en caso que no regresar a la version anterior
    Movie.associate = function (models) {
        Movie.hasMany(models.Showtime, {
            foreignKey: 'movieId',
            as: 'showtimes', // Alias para acceder a los showtimes
            onDelete: 'CASCADE',
        });
    };

    // // Version anterior:
    // Movie.associate = function (models) {
    //     Movie.hasMany(models.Showtime);
    // }


    return Movie;
};
