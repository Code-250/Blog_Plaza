import jwt from "jsonwebtoken";
import errorSuccessHandler from "../utils/errSuccHandler.js";

const { errorHandler } = errorSuccessHandler;
class protections {
  static routeProtect = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userData = decoded;

      return next();
    } catch (err) {
      console.log(err.message);
      return errorHandler(res, 500, "Error while verifying token!");
    }
  };
}

export default protections;
