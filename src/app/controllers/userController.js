import userServices from "../../database/services/userServices";
import encryption from "../helpers/auth";
import responseHandler from "../utils/respHandler";
import { userValidate, validate } from "../validations/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

const { encryptPassword, decryptPassword, signToken, verifyToken } = encryption;
const {
  createUser,
  findUser,
  findUsers,
  updateUser,
  deleteUser,
} = userServices;
const { respSuccess, respError } = responseHandler;
const { JWT_SECRET, JWT_EXPIRE } = process.env;

class userController {
  static async signUp(req, res) {
    const user = { ...req.body };
    const { details: errors } = validate(userValidate.signupSchema, user);
    if (errors)
      return respError(
        res,
        400,
        `please provide ${errors[0].context.key}`,
        errors[0]
      );

    const hash = await encryptPassword(user.password);
    const emailExists = await findUser({ email: user.email });
    if (emailExists) return respError(res, 409, "email already exists");

    const createdUser = await createUser({ ...user, password: hash });
    if (!createdUser) return respError(res, 500, "internal server error");
    return respSuccess(res, 201, "user Successfully Registered", createdUser);
  }
  static async findUser(req, res) {
    const foundUser = await findUser({ id: req.params.id });
    if (!foundUser) return respError(res, 404, "user not found");

    return respSuccess(res, 200, `this is the user with passed id `, foundUser);
  }
  static async findusers(req, res) {
    const foundUsers = await findUsers();
    if (foundUsers.length === 0)
      return respError(res, 404, "no users registered");

    return respSuccess(res, 200, "all registered users", foundUsers);
  }
  static async updateuser(req, res) {
    const searchUser = await findUser({ id: req.params.id });
    if (!searchUser) return respError(res, 404, "user does not exist");

    const { details: errors } = validate(
      userValidate.updateUserValidate,
      req.body
    );
    if (errors) return respError(res, 400, errors[0].message, errors[0]);
    const userUpdated = { ...req.body };
    const hashUpdate = await encryptPassword(userUpdated.password);
    const userUpdate = await updateUser(
      { ...userUpdated, password: hashUpdate },
      { id: req.params.id }
    );

    return respSuccess(res, 200, "user updated Successfully", userUpdate);
  }
  static async deleteUser(req, res) {
    const removeUser = await findUser({ id: req.params.id });
    if (!removeUser) return respError(res, 404, "user not found");

    const userDelete = await deleteUser({ id: req.params.id });
    return respSuccess(res, 200, "successfully deleted user");
  }
  static async login(req, res) {
    const { details: errors } = validate(userValidate.loginSchema, req.body);
    if (errors)
      return respError(
        res,
        400,
        `please provide${errors[0].context.key}`,
        errors[0]
      );
    const { email, password } = req.body;
    const foundUser = await findUser({ email });
    if (!foundUser) return respError(res, 404, "user not found");

    const isValid = await encryption.decryptPassword(
      password,
      foundUser.password
    );
    if (!isValid) return respError(res, 401, "wrong credentials");

    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );
    return respSuccess(res, 200, "user logged in successfully", {
      foundUser,
      token,
    });
  }
}

export default userController;
