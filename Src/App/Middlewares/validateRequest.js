import errorHandler from "../utils/errorHandler.js";
import {
  createPost,
  updatePost,
  login,
  signup,
} from "../Helpers/validation.js";

class routeValidators {
  static async postValidate(req, res, next) {
    const { error } = createPost.validate(req.body);
    if (error) {
      return errorHandler(
        res,
        400,
        `Validaton error: ${error.message.replace(/"/g, "")}`
      );
    }
    return next();
  }

  static async updateValidate(req, res, next) {
    const { error } = updatePost.validate(req.body);
    if (error) {
      return errorHandler(
        res,
        400,
        `Validaton error: ${error.message.replace(/"/g, "")}`
      );
    }
    return next();
  }
  static async loginValidate(req, res, next) {
    const { error } = login.validate(req.body);
    if (error) {
      return errorHandler(
        res,
        400,
        `Validaton error: ${error.message.replace(/"/g, "")}`
      );
    }
    return next();
  }
  static async signupValidate(req, res, next) {
    const { error } = signup.validate(req.body);
    if (error) {
      return errorHandler(
        res,
        400,
        `Validaton error: ${error.message.replace(/"/g, "")}`
      );
    }
    return next();
  }
}

export default routeValidators;
