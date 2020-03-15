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
  });

  User.associate = ({ Group }) => {
    User.belongsToMany(Group, {
      through: 'UserGroups',
      as: 'groups',
      foreignKey: 'userId'
    });
  };

  return User;
};
