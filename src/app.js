import express from 'express';
import users from './api/routes/v1/users';
import groups from './api/routes/v1/groups';
import notFoundPage from './api/routes/v1/notFoundPage';
import models from './models';

const app = express();
const PORT = process.env.PORT || 5000;
const cleanDB = process.env.CLEANDB || false;

// Middleware
app.use(express.json());

// Route
app.use('/v1/users', users);
app.use('/v1/groups', groups);
app.use(notFoundPage);

models.sequelize.sync({ force: cleanDB }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
