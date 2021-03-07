import express from "express";
import cors from "cors";
import PostsRouter from "./App/Routes/Blog/postsRoute.js";
import Post from "./Database/Models/PostsModel.js";

const app = express();
// express request of content

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Post.sequelize.sync({ force: true }).then(() => {});

app.get("/", (request, response) => {
  response.json({ message: "Hello world this is richard" });
});
response.json({
  message: "hello richard",
});
app.use("/api/posts", PostsRouter);

app.use("/api/users", UserRouter);
// set listener for request
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is up and running on ${port}`);
});
