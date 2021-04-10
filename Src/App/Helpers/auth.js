import { config } from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRE } = process.env;

class encryption {
  static async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    if (!hashed) return false;
    return hashed;
  }
  static async decryptPassword(password, hashed) {
    const isvalid = await bcrypt.compare(password, hashed);
    if (!isvalid) return false;
    return isvalid;
  }
  static async signToken({ email, id }) {
    const token = jwt.sign({ email, id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    return token;
  }
  static async verifyToken(token) {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
  }
}
export default encryption;