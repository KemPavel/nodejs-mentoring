import Sequelize from 'sequelize';

const postgresqlURI = 'postgres://kvtbvfotruitnp:0a6a804d8717165bd4729856dc2297859b4a062518126c934f5daee89492780a@ec2-54-195-252-243.eu-west-1.compute.amazonaws.com:5432/deul914kqspbkq';

const sequelize = new Sequelize(postgresqlURI, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const models = {
  User: sequelize.import('./User')
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
