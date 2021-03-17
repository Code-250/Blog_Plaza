import "dotenv/config";
import { sign, verify } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

const { JWT_SECRET, JWT_EXPIRE } = process.env;

class encryption {
  static async encryptPassword(password) {
    const hashed = await hash(password, 10);
    return hashed;
  }

  static async decryptPassword(password, hashed) {
    const isValid = await compare(password, hashed);
    return isValid;
  }

  static async signToken(data) {
    const token = sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    return token;
  }

  static async verifyToken(token) {
    const data = verify(token, JWT_SECRET);
    return data;
  }
}

export default encryption;
