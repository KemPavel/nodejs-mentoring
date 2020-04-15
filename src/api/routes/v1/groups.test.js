import app from '../../../app';

const request = require('supertest')(app);

const mockGroups = [
  {
    createdAt: '2020-04-15T20:45:05.829Z',
    id: 1,
    name: 'dev',
    permissions: [
      'READ',
      'CREATE',
      'UPDATE'
    ],
    updatedAt: '2020-04-15T20:45:05.829Z'
  },
  {
    createdAt: '2020-04-15T20:45:05.829Z',
    id: 2,
    name: 'test',
    permissions: [
      'READ'
    ],
    updatedAt: '2020-04-15T20:45:05.829Z'
  }
];

describe('users router test', () => {
  let token;

  beforeEach(async () => {
    const { body } = await request.post('/v1').send({ login: 'john_test', password: '1234' });
    token = body.token;
  });

  it('should get all groups', async () => {
    const { body } = await request.get('/v1/groups').set({ ['x-auth-token']: token });
    expect(body.length).toEqual(mockGroups.length);
  });

  it('should get group by ID', async () => {
    const { body } = await request.get('/v1/groups/2').set({ ['x-auth-token']: token });
    const { name, id, permissions } = mockGroups[1];
    expect(body.name).toEqual(name);
    expect(body.id).toEqual(id);
    expect(body.permissions.length).toEqual(permissions.length);
  });
});
