module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['READ']
    }
  });

  Groups.associate = (models) => {
    Groups.belongsToMany(models.Users, {
      through: 'UserGroups',
      as: 'users',
      foreignKey: 'groupId'
    });
  };

  return Groups;
};
