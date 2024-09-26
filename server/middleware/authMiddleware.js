const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
require('dotenv').config();

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'No se proporciona el token' });
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: 'Token no válido' });
        }
        
        req.user = decoded; 
        next();
    });
}

module.exports = {
    authMiddleware
};
