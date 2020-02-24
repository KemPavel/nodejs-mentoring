import { User } from './models';

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

const seed = () => {
  return User.sync({ force: true }).then(() => {
    return User.bulkCreate(predefinedUsers);
  });
};

// Add predefined users to DB
seed().then(() => {
  console.log('predefined users inserted');
  process.exit();
});
