module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
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

  Group.associate = ({ User }) => {
    Group.belongsToMany(User, {
      through: 'UserGroups',
      as: 'users',
      foreignKey: 'groupId'
    });
  };

  return Group;
};
