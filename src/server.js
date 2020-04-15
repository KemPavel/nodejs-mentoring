import { winstonLogger } from './services';
import models from './models';
import app from './app';


const PORT = process.env.PORT || 5000;
const cleanDB = process.env.CLEANDB || false;

models.sequelize.sync({ force: cleanDB }).then(() => {
  app.listen(PORT, () => winstonLogger.info(`Server is running on port ${PORT}`));
});
