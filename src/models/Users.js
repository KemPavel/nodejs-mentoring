module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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

  Users.associate = (models) => {
    Users.belongsToMany(models.Groups, {
      through: 'UserGroups',
      as: 'groups',
      foreignKey: 'userId'
    });
  };

  return Users;
};
