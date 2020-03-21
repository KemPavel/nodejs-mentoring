import jwt from 'jsonwebtoken';
import config from 'config';
import { ErrorHandler } from '../services';

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    const error = new ErrorHandler(401, 'No token, authorization denied');
    return next(error);
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    return next();
  } catch (err) {
    const error = new ErrorHandler(403, 'Token is not valid');
    return next(error);
  }
};
