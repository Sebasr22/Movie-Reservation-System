'use strict';

const { User, Role } = require('../../models');

module.exports = {

    /**
   *
   * @version        :1.0.0
   * @description    :Servicio para validar si existe un nombre de usuario
   * @param {String} username - nombre de usuario
   * @returns
   *
   */

    async checkIfUsernameExistService(_username) {
        try {
            if (!_username) throw new Error('El nombre de usuario es requerido');

            const user = await User.findOne({ where: { username: _username } });

            return user ? true : false;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para validar si existe un correo
     * @param {String} email - correo
     * @returns
     * 
     */
    async checkIfEmailExistService(_email) {
        try {
            if (!_email) throw new Error('El correo es requerido');

            const user = await User.findOne({ where: { email: _email } });

            return user ? true : false;

        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para crear un nuevo usuario
     * @param {String} username - nombre de usuario
     * @param {String} password - contraseña
     * @param {String} email - correo
     * @param {String} name - nombre
     * @param {String} lastname - apellido
     * @returns
     * 
     */
    async createUserService(_username, _password, _email, _name, _lastname) {
        try {
            if (!_username) throw new Error('Error, parámetro "_username" no proporcionado');
            if (!_password) throw new Error('Error, parámetro "_password" no proporcionado');
            if (!_email) throw new Error('Error, parámetro "_email" no proporcionado');
            if (!_name) throw new Error('Error, parámetro "_name" no proporcionado');
            if (!_lastname) throw new Error('Error, parámetro "_lastname" no proporcionado');

            return new User({
                username: _username,
                password: _password,
                email: _email,
                name: _name,
                lastname: _lastname
            });

        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para obtener la data del usuario
     * @param {String} username - nombre de usuario
     * @returns
     * 
     */
    async getUserService(_username) {
        try {
            if (!_username) throw new Error('Error, parámetro "_username" no proporcionado');

            const user = await User.findOne({
                where: {
                    username: _username
                },
                include: {
                    model: Role,
                    as: 'role'
                }
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Formatear la respuesta
            const formattedUser = {
                id: user.id,
                username: user.username,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                id_role: user.role ? user.role.dataValues.role : null
            };

            return formattedUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para obtener todos los usuarios
     * @returns
     * 
     */
    async getUsersService() {
        try {
            return await User.findAll();
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para verificar que el idUser exista
     * @param {Number} idUser - Identificador del usuario
     * @returns
     * 
     */
    async checkIfIdUserExistService(_idUser) {
        try {
            if (!_idUser) throw new Error('Error, parámetro "_idUser" no proporcionado');

            const user = await User.findByPk(_idUser);

            return user ? true : false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para verificar que el rol sea valido
     * @param {number} idRole - rol
     * @returns
     * 
     */
    async checkIfRoleIsValidService(_idRole) {
        try {
            if (!_idRole) throw new Error('Error, parámetro "_idRole" no proporcionado');

            const role = await Role.findByPk(_idRole);

            if (role === "admin") {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para cambiar el rol de un usuario
     * @param {Number} idUser - Identificador del usuario
     * @param {Number} idRole - rol
     * @returns
     * 
     */
    async changeRoleService(_idUser, _idRole) {
        try {
            if (!_idUser) throw new Error('Error, parámetro "_idUser" no proporcionado');
            if (!_idRole) throw new Error('Error, parámetro "_idRole" no proporcionado');

            const user = await User.findByPk(_idUser);

            if (user) {
                user.id_role = _idRole;
                await user.save();
            }

            return user;
        } catch (error) {
            throw error;
        }
    },


};