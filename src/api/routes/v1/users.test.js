import app from '../../../app';

const request = require('supertest')(app);

const mockUsers = [
  {
    age: 7,
    createdAt: '2020-04-04T22:49:04.468Z',
    id: 1,
    isDeleted: false,
    login: 'john_test',
    updatedAt: '2020-04-04T22:49:04.468Z'
  },
  {
    age: 71,
    createdAt: '2020-04-04T22:49:04.468Z',
    id: 2,
    isDeleted: false,
    login: 'Sara_test',
    updatedAt: '2020-04-04T22:49:04.468Z'
  },
  {
    age: 17,
    createdAt: '2020-04-04T22:49:04.468Z',
    id: 3,
    isDeleted: false,
    login: 'Rico_test',
    updatedAt: '2020-04-04T22:49:04.468Z'
  },
  {
    age: 27,
    createdAt: '2020-04-04T22:49:04.468Z',
    id: 4,
    isDeleted: false,
    login: 'Freddie_test',
    updatedAt: '2020-04-04T22:49:04.468Z'
  }
];

describe('users router test', () => {
  let token;

  beforeEach(async () => {
    const { body } = await request.post('/v1').send({ login: 'john_test', password: '1234' });
    token = body.token;
  });

  it('should deny the access if no token provided', async () => {
    const { status, body } = await request.get('/v1/users');
    expect(status).toEqual(401);
    expect(body.msg).toEqual('No token, authorization denied');
  });

  it('should get all users', async () => {
    const { body } = await request.get('/v1/users').set({ ['x-auth-token']: token });
    expect(body.length).toEqual(mockUsers.length);
  });

  it('should get user by ID', async () => {
    const { body } = await request.get('/v1/users/1').set({ ['x-auth-token']: token });
    const { login, age, isDeleted } = mockUsers[0];
    const expected = {
      login,
      age,
      isDeleted,
      password: '1234'
    };
    expect(body.login).toEqual(expected.login);
    expect(body.age).toEqual(expected.age);
    expect(body.isDeleted).toEqual(expected.isDeleted);
    expect(body.password).toEqual(expected.password);
  });

  it('should return error while providing invalid password for new user', async () => {
    const newUser = {
      login: 'test',
      password: '1234',
      age: 10
    };
    const { body: { msg } } = await request
      .post('/v1/users')
      .send(newUser)
      .set({ ['x-auth-token']: token });
    expect(msg[0].msg).toEqual('Password must contain at least one letter');
  });

  it('should return error if there is no login for new user', async () => {
    const newUser = {
      password: '1234',
      age: 10
    };
    const { body: { msg } } = await request
      .post('/v1/users')
      .send(newUser)
      .set({ ['x-auth-token']: token });
    expect(msg[0].msg).toEqual('Login is required');
  });

  it('should return error if there is no age for new user', async () => {
    const newUser = {
      password: '1234asdf',
      login: 'test'
    };
    const { body: { msg } } = await request
      .post('/v1/users')
      .send(newUser)
      .set({ ['x-auth-token']: token });
    expect(msg[0].msg).toEqual('Age is required');
  });
});
