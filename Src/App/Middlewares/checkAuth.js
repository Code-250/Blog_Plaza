import jwt from "jsonwebtoken";
import { secret } from "../../Database/Services/secretKey.js";

export const checkAuth = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secret.env);
    request.userData = decodedToken;
    next();
  } catch (err) {
    console.log(err);
    return response.status(401).send({
      message: "Invalid or expired token ",
      error: err,
    });
  }
};
