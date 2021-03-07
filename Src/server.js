import express from "express";
import cors from "cors";
<<<<<<< HEAD
import PostsRouter from "./App/Routes/Blog/postsRoute.js";
import Post from "./Database/Models/PostsModel.js";
=======
>>>>>>> bf8cc44 (managed tu create users)
import Post from "./Database/models/PostsModel.js";
import User from "./Database/models/UserModels.js";
import PostsRouter from "./App/Routes/Blog/PostsRoute.js";
import UserRouter from "./App/Routes/Auth/userRoute.js";

// importing Routes

const app = express();
// express request of content

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Post.sequelize.sync({ force: true }).then(() => {});

app.get("/", (request, response) => {
  response.json({ message: "Hello world this is richard" });
});
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
response.json({
  message: "hello richard",
});
>>>>>>> 363f212 (issue)
=======
>>>>>>> bf8cc44 (managed tu create users)
=======
response.json({
  message: "hello richard",
});
>>>>>>> 04a11b73599f968ae6eda652344ad1dd8ca0e85b
app.use("/api/posts", PostsRouter);

app.use("/api/users", UserRouter);
// set listener for request
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is up and running on ${port}`);
});
