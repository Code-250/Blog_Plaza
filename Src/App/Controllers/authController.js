import jwt from "jsonwebtoken";
import { config } from "dotenv";
import errorSuccessHandler from "../utils/errSuccHandler.js";
import PwdService from "../Helpers/passwordHash.js";
import userServices from "../../Database/Services/user.js";
import {
  createPost,
  updatePost,
  signup,
  login,
} from "../Helpers/validation.js";

config();

const { deleteOne, findUser, createdUser } = userServices;
const { errorHandler, successHandler } = errorSuccessHandler;
class auth {
  // User Registering

  static async register(req, res, next) {
    try {
      const validate = signup.validate(req.body);
      if (!validate) {
        console.log(validate.error);
        next(errorHandler(res, 422, validate.error.details[0].message));
      }
      const { password, email, username } = req.body;

      const hash = await PwdService.hashPassword(password);
      const emailExist = await findUser({
        where: { email: email },
      });

      if (emailExist) {
        return next(errorHandler(res, 404, "email already taken"));
      }
      const user = await createdUser({
        username,
        email,
        password: hash,
      });

      return successHandler(res, 201, "Successfully Registered a user", user);
    } catch (error) {
      console.log(error.message);
      return next(
        errorHandler(
          res,
          500,
          `Ooops! Unable to register User :( ..... ${error.message}`
        )
      );
    }
  }

  //  User Login

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const foundUser = await findUser({ where: { username: username } });
      if (!foundUser) return errorHandler(res, 404, "User  Not found");
      const isMatch = await PwdService.checkPassword(
        password,
        foundUser.password
      );
      if (!isMatch) return errorHandler(res, 401, "Invalid password");

      const token = jwt.sign(
        { id: foundUser.id, username: foundUser.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );
      return successHandler(res, 200, "User login successful :)", {
        token,
        foundUser,
      });
    } catch (err) {
      console.log(err.message);
      return next(
        errorHandler(
          res,
          400,
          `Oh No! Error while logging user :( ${err.message}`
        )
      );
    }
  }
  // get all the users

  static async getUsers(req, res, next) {
    try {
      const user = await findUsers();
      if (!user) {
        return next(
          errorHandler(res, 404, "Ooops! Looks like there are no users :(")
        );
      }
      return successHandler(res, 200, "All users retreived successfully", user);
    } catch (err) {
      console.log(err.message);
      return next(
        errorHandler(
          res,
          500,
          "oooh,No! some thing went wrong while getting user...."
        )
      );
    }
  }
  // remove Users

  static async deleteUser(req, res, next) {
    try {
      const user = await deleteOne({ id: req.params.id });
      if (!user) {
        return next(
          errorHandler(
            res,
            404,
            `No user found wth the id of: ${req.params.id} :(`
          )
        );
      }
      return successHandler(res, 200, "Deleted successfully a user", user);
    } catch (err) {
      console.log(err.message);
      return next(
        errorHandler(
          res,
          500,
          `something went down while deleting user......${err.message}`
        )
      );
    }
  }
}

export default auth;
