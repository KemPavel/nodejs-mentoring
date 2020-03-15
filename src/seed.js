import { User, Group, UserGroups } from './models';

const predefinedUsers = [
  {
    login: 'john_test',
    age: 7,
    isDeleted: false,
    password: '1234'
  },
  {
    login: 'Sara_test',
    age: 71,
    isDeleted: false,
    password: '1234'
  },
  {
    login: 'Rico_test',
    age: 17,
    isDeleted: false,
    password: '1234'
  },
  {
    login: 'Freddie_test',
    age: 27,
    isDeleted: false,
    password: '1234'
  }
];

const predefinedGroups = [
  {
    name: 'dev',
    permissions: ['READ', 'CREATE', 'UPDATE']
  },
  {
    name: 'test'
  }
];

const seed = () => {
  return User.sync({ force: true }).then(() => {
    return User.bulkCreate(predefinedUsers).then(() => {
      return Group.sync({ force: true }).then(() => {
        return Group.bulkCreate(predefinedGroups).then(() => {
          return UserGroups.sync({ force: true });
        });
      });
    });
  });
};

// Add predefined users to DB
seed().then(() => {
  console.log('predefined users inserted');
  process.exit();
});
