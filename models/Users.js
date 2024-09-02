module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            references: {
                model: 'Roles',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    });

    User.associate = function (models) {
        User.belongsTo(models.Role, {
            foreignKey: 'id_role',
            as: 'role'
        });
        User.hasMany(models.Reservation, {
            foreignKey: 'id_user',
            as: 'reservations'
        });
    };

    return User;
};
