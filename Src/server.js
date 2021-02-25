import express, { json, urlencoded } from "express";
import cors from "cors";
import Post from "./Database/Models/PostsModel.js";
import PostsRouter from "./App/Routes/Blog/PostsRoute.js";

// importing Routes

const app = express();
// express request of content

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json({
    message: "hello richard",
  });
});
Post.sequelize.sync({ force: true }).then(() => {
  console.log("database conneted waaaw!!!");
});
app.use("/api/posts", PostsRouter);
// set listener for request
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is up and running on ${port}`);
});
