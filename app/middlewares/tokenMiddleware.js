const jwt = require('jsonwebtoken');

const verifyTokenMiddleware = (req, res, next) => {

    const secretKey = process.env.JWT_SECRET_KEY;

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        // Agrega los datos del usuario al req.userData
        req.userData = decoded;

        // Continúa con la ejecución de las rutas
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = verifyTokenMiddleware;