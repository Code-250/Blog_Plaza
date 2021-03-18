import bcrypt from "bcryptjs";

export default class PasswordServices {
  static hashPassword(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(10));
  }

  static checkPassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
}
