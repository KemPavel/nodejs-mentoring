import { Users, Groups } from './models';

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
  return Users.sync({ force: true }).then(() => {
    return Users.bulkCreate(predefinedUsers).then(() => {
      return Groups.sync({ force: true }).then(() => {
        return Groups.bulkCreate(predefinedGroups);
      });
    });
  });
};

// Add predefined users to DB
seed().then(() => {
  console.log('predefined users inserted');
  process.exit();
});
