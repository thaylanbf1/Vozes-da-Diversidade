const jwt = require('jsonwebtoken');
const SECRET_KEY = 'seuSegredoSuperSecreto123';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ success: false, message: 'Token não fornecido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Token inválido ou expirado' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
