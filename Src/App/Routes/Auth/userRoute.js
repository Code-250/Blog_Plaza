import { Router } from "express";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b23f900 (all apis)
=======
>>>>>>> 239248d (user authentication and routes protection)
=======
>>>>>>> 239248d (user authentication and routes protection)
import { signUp, Login, deleteUser } from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", signUp);
UserRouter.post("/login", Login);
<<<<<<< HEAD
=======
=======
>>>>>>> bf8cc44 (managed tu create users)
import {
  createUser,
  getAllUser,
  deleteUser,
} from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", createUser);
UserRouter.get("/", getAllUser);
<<<<<<< HEAD
>>>>>>> bf8cc44 (managed tu create users)
=======
import { signUp, Login, deleteUser } from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", signUp);
UserRouter.post("/login", Login);
>>>>>>> aed9245 (user authentication and routes protection)
=======
>>>>>>> b23f900 (all apis)
=======
>>>>>>> bf8cc44 (managed tu create users)
=======
import { signUp, Login, deleteUser } from "../../Controllers/userController.js";

const UserRouter = Router();

UserRouter.post("/", signUp);
UserRouter.post("/login", Login);
>>>>>>> aed9245 (user authentication and routes protection)
UserRouter.delete("/:id", deleteUser);

export default UserRouter;
