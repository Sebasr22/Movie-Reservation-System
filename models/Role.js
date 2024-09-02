module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user',
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    Role.associate = function (models) {
        Role.hasMany(models.User, {
            foreignKey: 'id_role',
            as: 'users'
        });
    };

    return Role;
};