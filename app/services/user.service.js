'use strict';

const UsersModel = require('../../models/Users');

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

            const user = await UsersModel.findOne({ username: _username });

            return user ? true : false;

        } catch (error) {
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

            const user = await UsersModel.findOne({ email: _email });

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

            return new UsersModel({
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

            const user = await UsersModel.findOne({
                username: _username
            });

            return user;
        } catch (error) {
            throw error;
        }
    },

    
    
};