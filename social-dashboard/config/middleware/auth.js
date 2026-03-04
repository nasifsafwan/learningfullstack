const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const header = req.header('Authorization');
    const token = header && header.startsWith('Bearer ') ? header.substring(7) : null;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id , username: decoded.username };
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = auth;