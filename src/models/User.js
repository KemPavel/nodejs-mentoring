module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  });

  // Add predefined users to DB
  User.sync({ force: true }).then(() => {
    User.create({
      login: 'john',
      age: 7,
      isDeleted: false,
      password: '1234'
    });
    User.create({
      login: 'Sara',
      age: 71,
      isDeleted: false,
      password: '1234'
    });
    User.create({
      login: 'Rico',
      age: 17,
      isDeleted: false,
      password: '1234'
    });
    User.create({
      login: 'Freddie',
      age: 27,
      isDeleted: false,
      password: '1234'
    });
  });

  return User;
};
