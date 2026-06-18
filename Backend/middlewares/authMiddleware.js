// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "Akses ditolak! Silakan login." });
    }

    try {
        const decoded = jwt.verify(token, 'RAHASIA_ANDA'); // Ganti dengan secret key Anda
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token tidak valid!" });
    }
};

module.exports = verifyToken;