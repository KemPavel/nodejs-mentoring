module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
      allowNull: false
      // QUESTION: do I need to add validators here as well as I did on routes?
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
      // QUESTION: do I need to add validators here as well as I did on routes?
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  });

  // Add predefined users to DB
  User.sync().then(() => {
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
