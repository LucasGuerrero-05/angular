// src/middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se ha proporcionado un token.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_jwt');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Token inválido.' });
  }
};
