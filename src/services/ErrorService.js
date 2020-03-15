const notFoundPage = (req, res, next) => {
  res.status(404).json({ msg: 'Page not found' });
  next();
};

const logger = (req, res, next) => {
  console.log('Request Type: ', req.method);
  console.log('Request Path: ', req.path);
  console.log('Request arguments: ', req.query);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ msg: err.message });
};

module.exports = {
  notFoundPage,
  logger,
  errorHandler
};
