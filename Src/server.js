import express, { json, urlencoded } from "express";
import cors from "cors";
import Post from "./Database/models/PostsModel.js";
import User from "./Database/models/UserModels.js";
import PostsRouter from "./App/Routes/Blog/PostsRoute.js";
import UserRouter from "./App/Routes/Auth/userRoute.js";

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
app.use("/api/posts", PostsRouter);

app.use("/api/users", UserRouter);
// set listener for request
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is up and running on ${port}`);
});
