import express from 'express';
import cors from 'cors';
import users from './api/routes/v1/users';
import groups from './api/routes/v1/groups';
import login from './api/routes/v1/login';
import auth from './middlewares/auth';
import { notFoundPage, customLogger, handleError, winstonLogger } from './services';
import models from './models';

const app = express();
const PORT = process.env.PORT || 5000;
const cleanDB = process.env.CLEANDB || false;

// Disable 'x-powered-by' response header
app.disable('x-powered-by');

// Middleware
app.use(cors());
app.use(express.json());
app.use(customLogger);

// Route
app.use('/v1', login);
app.use('/v1/users', auth, users);
app.use('/v1/groups', auth, groups);

// Error handling
app.use(notFoundPage);
app.use((err, req, res, next) => {
  handleError(err, res);
});

process
  .on('unhandledRejection', (reason, promise) => {
    winstonLogger.error(reason, 'Unhandled Rejection at Promise', promise);
  })
  .on('uncaughtException', err => {
    winstonLogger.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

models.sequelize.sync({ force: cleanDB }).then(() => {
  app.listen(PORT, () => winstonLogger.info(`Server is running on port ${PORT}`));
});
