const SUGGESTED_USERS_LIMIT = 5;

const dataStorage = {
  users: [],
  getUsers() {
    return this.users;
  },
  getSuggestedUsers(login, limit = SUGGESTED_USERS_LIMIT) {
    return this.users
      .filter((user) => user.login.toLowerCase().includes(login.toLowerCase()))
      .slice(0, limit)
      .sort();
  },
  getUserById(id) {
    return this.users.find((usr) => usr.id === id);
  },
  getUserIndex(id) {
    return this.users.findIndex((usr) => usr.id === id);
  },
  addUser(user) {
    this.users.push(user);
  },
  updateUser(index, user) {
    this.users.splice(index, 1, user);
  }
};


module.exports = dataStorage;
