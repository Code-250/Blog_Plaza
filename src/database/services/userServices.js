import Models from "../models/index";

const { User } = Models;

class userServices {
  static async createUser(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }
  static async findUser(param) {
    const user = await User.findOne({ where: param });
    return user;
  }
  static async findUsers() {
    const users = await User.findAll();
    return users;
  }
  static async updateUser(user, param) {
    const updateUser = await User.update(user, { where: [param] });
    return updateUser;
  }
  static async deleteUser(param) {
    const deletedUser = await User.destroy({ where: param });
    return deletedUser;
  }
}

export default userServices;