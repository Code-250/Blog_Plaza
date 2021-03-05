import { Router } from "express";
<<<<<<< HEAD
<<<<<<< HEAD
import { signUp, Login, deleteUser } from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", signUp);
UserRouter.post("/login", Login);
=======
import {
  createUser,
  getAllUser,
  deleteUser,
} from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", createUser);
UserRouter.get("/", getAllUser);
>>>>>>> bf8cc44 (managed tu create users)
=======
import { signUp, Login, deleteUser } from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", signUp);
UserRouter.post("/login", Login);
>>>>>>> aed9245 (user authentication and routes protection)
UserRouter.delete("/:id", deleteUser);

export default UserRouter;
