import verifyToken from "./authJwt.js";
import checkDuplicateUserOrEmail from "./verifySignup.js";

export const checkings = {
  verifyToken,
  checkDuplicateUserOrEmail,
};
