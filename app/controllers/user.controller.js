'use strict';

const jwt = require('jsonwebtoken');

const { createUserService, getUsersService, changeRoleService } = require('../services/user.service');

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Registro
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    registerController: async (req, res) => {
        try {
            const { username, password, email, name, lastname } = req.body;

            // Crear un nuevo usuario
            const user = await createUserService(username, password, email, name, lastname).catch((error) => {
                throw new Error(error.message);
            });

            // Guardar el usuario en la base de datos
            await user.save();

            return res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Iniciar sesión
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    loginController: async (req, res) => {
        try {

            const secretKey = process.env.JWT_SECRET_KEY;
            const { USER } = req.CC;

            // Definimos lo que vamos a responder
            const RESPONSE = {
                idUser: USER._id,
                username: USER.username,
                email: USER.email,
                name: USER.name,
                lastname: USER.lastname,
            };

            const token = jwt.sign(RESPONSE, secretKey, { expiresIn: '12h' });

            // Agregamos el token a la respuesta
            RESPONSE.token = token;

            return res.status(200).json({ message: 'Inicio de sesión exitoso', userData: RESPONSE });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Obtener usuarios
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    getUsersController: async (req, res) => {
        try {

            // Obtener los usuarios
            const users = await getUsersService().catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ users });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Cambiar rol de usuario
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    changeRoleController: async (req, res) => {
        try {
            
            const { idUser, idRole } = req.body;

            // Cambiar el rol del usuario
            await changeRoleService(idUser, idRole).catch((error) => {
                throw new Error(error.message);
            });

            return res.status(200).json({ message: 'Rol cambiado correctamente' });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },


};