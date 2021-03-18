import User from "../Models/UserModels.js";

class userServices {
  static async findUser(param) {
    const user = await User.findOne(param);
    return user;
  }

  static async createdUser(user) {
    const createUser = await User.create(user);
    return createUser;
  }

  static async findUsers() {
    const users = await User.findAll();
    return users;
  }

  static async updateUser(user, param) {
    const updatedUser = await User.update(user, {
      where: [param],
    });
    return updatedUser;
  }

  static async deleteOne(param) {
    const user = await User.destroy({
      where: param,
    });
    return user;
  }
}

export default userServices;
