import { Router } from "express";
import userController from "../controllers/userController";
// import protection from '../middleware/auth';

// const { routeProtect } = protection;
const {
  signUp,
  findusers,
  findUser,
  updateuser,
  deleteUser,
  login,
} = userController;

const userRouter = Router();
userRouter.route("/").post(signUp).get(findusers);
userRouter.post("/login", login);
userRouter.route("/:id").get(findUser).put(updateuser).delete(deleteUser);

export default userRouter;
