import { Router } from "express";
import {
  createUser,
  getAllUser,
  deleteUser,
} from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", createUser);
UserRouter.get("/", getAllUser);
UserRouter.delete("/:id", deleteUser);

export default UserRouter;
