import express from 'express';
import users from './api/routes/v1/users';
import groups from './api/routes/v1/groups';
import { notFoundPage, logger, errorHandler } from './services';
import models from './models';

const app = express();
const PORT = process.env.PORT || 5000;
const cleanDB = process.env.CLEANDB || false;

// Middleware
app.use(express.json());
app.use(logger);

// Route
app.use('/v1/users', users);
app.use('/v1/groups', groups);

// Error handling
app.use(notFoundPage);
app.use(errorHandler);

process
  .on('unhandledRejection', (reason, promise) => {
    console.error(reason, 'Unhandled Rejection at Promise', promise);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

models.sequelize.sync({ force: cleanDB }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
