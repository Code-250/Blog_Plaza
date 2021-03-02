import { Router } from "express";
import { signUp, Login, deleteUser } from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", signUp);
UserRouter.post("/login", Login);
UserRouter.delete("/:id", deleteUser);

export default UserRouter;
