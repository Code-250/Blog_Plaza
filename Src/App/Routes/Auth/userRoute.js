import { Router } from "express";
import authController from "../../Controllers/authController.js";
import protections from "../../Middlewares/authMidleware.js";

const UserRouter = Router();

const { routeProtect } = protections;
const { login, register, getUsers, deleteUser } = authController;

const router = Router();

UserRouter.route("/register").post(register);

UserRouter.get("/login", login);
UserRouter.get("/", routeProtect, getUsers);
UserRouter.delete("/:id", routeProtect, deleteUser);

export default UserRouter;
