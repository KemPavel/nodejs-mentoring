import { createLogger, transports, format } from 'winston';

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

const winstonLogger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.simple())
    })
  ]
});

const notFoundPage = (req, res, next) => {
  const err = new ErrorHandler(404, 'Page not found');
  next(err);
};

const customLogger = (req, res, next) => {
  console.log('Request Type: ', req.method);
  console.log('Request Path: ', req.path);
  console.log('Request arguments: ', req.query);
  next();
};

const handleError = (err, res) => {
  winstonLogger.error(err.message);
  res.status(err.statusCode).json({ msg: err.message });
};

module.exports = {
  notFoundPage,
  customLogger,
  handleError,
  winstonLogger,
  ErrorHandler
};
