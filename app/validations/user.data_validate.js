'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

const { checkIfUsernameExistService, checkIfEmailExistService, getUserService, checkIfIdUserExistService, checkIfRoleIsValidService } = require('../services/user.service');

module.exports = {

    registerDataValidate: async (req, res, next) => {

        try {

            const schema = Joi.object({
                username: Joi.string().min(6).max(30).required(),
                password: Joi.string().min(6).max(30).required(),
                confirmPassword: Joi.string().min(6).max(30).required(),
                email: Joi.string().email().required(),
                name: Joi.string().min(3).max(30).required(),
                lastname: Joi.string().min(3).max(30).required()
            });

            const { error } = await schema.validate(req.body);

            if (error) {
                const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
                return res.status(400).json({ errors });
            }

            //  ===========================
            //  ======= username ==========
            //  ===========================

            // Verificar si el username ya existe
            const usernameExists = await usernameExists(req.body.username);

            if (usernameExists) {
                return res.status(400).json({ message: 'El nombre de usuario ya existe' });
            }

            //  ===========================
            //  ======= password ==========
            //  ===========================

            // Verificar si las contraseñas coinciden
            if (req.body.password !== req.body.confirmPassword) {
                return res.status(400).json({ message: 'Las contraseñas no coinciden' });
            }

            // Encriptar la contraseña
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);

            // Reemplazar la contraseña original por la encriptada
            req.body.password = password;

            //  ===========================
            //  ========= email ===========
            //  ===========================

            // Verificar si el email ya existe
            const emailExists = await checkIfEmailExistService(req.body.email);

            if (emailExists) {
                return res.status(400).json({ message: 'El correo ya existe' });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    },

    loginDataValidate: async (req, res, next) => {
        try {

            const schema = Joi.object({
                username: Joi.string().min(6).max(30).required(),
                password: Joi.string().min(6).max(30).required()
            });

            const { error } = await schema.validate(req.body);

            if (error) {
                const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
                return res.status(400).json({ errors });
            }

            const { username, password } = req.body;

            // ===========================
            // ======= username ==========
            // ===========================

            // Verificar si el username existe
            const usernameExists = await checkIfUsernameExistService(username);

            if (!usernameExists) {
                return res.status(400).json({ message: 'Credenciales invalidas' });
            }

            const USER = await getUserService(username).catch((error) => {
                throw error;
            });

            // ===========================
            // ======= password ==========
            // ===========================

            // Obtener el la contraseña del usuario
            const hasedPassword = USER.password;

            // Comparar la contraseña
            const validPassword = await bcrypt.compare(password, hasedPassword);

            if (!validPassword) {
                return res.status(400).json({ message: 'Credenciales invalidas' });
            }

            req.CC = req.CC || {};
            req.CC.USER = USER;


            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    },

    changeRoleDataValidate: async (req, res, next) => {
        try {

            const schema = Joi.object({
                idUser: Joi.number().required(),
                idRole: Joi.number().required()
            });

            const { error } = await schema.validate(req.body);

            if (error) {
                const errors = error.details.map((err) => ({ message: err.message, field: err.context.key }));
                return res.status(400).json({ errors });
            }

            // ===========================
            // ========= idUser ==========
            // ===========================

            // Verificar si el usuario existe
            const userExists = checkIfIdUserExistService(req.body.idUser);

            if (!userExists) {
                return res.status(400).json({ message: 'El usuario no existe' });
            }

            // ===========================
            // ========== idRole =========
            // ===========================

            // Verificar si el rol es valido
            const valididRole = checkIfRoleIsValidService(req.body.idRole);

            if (!valididRole) {
                return res.status(400).json({ message: 'El rol no es valido' });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    },

    

    
}
