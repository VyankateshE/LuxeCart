import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Token missing.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};
