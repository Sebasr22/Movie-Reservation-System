module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Roles', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user',
        }
    });

    Role.associate = function(models) {
        Role.hasMany(models.User);
    };

    return Role;
};