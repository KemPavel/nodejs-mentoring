import { Op } from 'sequelize';

export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser({ login, password, age }) {
    const user = {
      login,
      age,
      password
    };

    return this.userModel.create(user);
  }

  findUser(options) {
    return this.userModel.findOne(options);
  }

  findAllUsers(query) {
    const options = { attributes: { exclude: ['password'] } };
    const { login, limit = 5 } = query;

    if (login) {
      options.where = {
        login: { [Op.startsWith]: login }
      };
      options.limit = limit;
    }

    return this.userModel.findAll(options);
  }

  updateUser(userInfo, id) {
    return this.userModel.update(
      { ...userInfo },
      {
        where: { id },
        returning: true,
        plain: true
      }
    );
  }
}
