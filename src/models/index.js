import Sequelize from 'sequelize';
import config from 'config';

const db = config.get('postgresqlURI');

const sequelize = new Sequelize(db, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const models = {
  User: sequelize.import('./User'),
  Group: sequelize.import('./Group'),
  UserGroups: sequelize.import('./UserGroups')
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
