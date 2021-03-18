import { Router } from "express";
import "@babel/polyfill";
import postController from "../../Controllers/PostsController.js";
import protections from "../../Middlewares/authMidleware.js";

const PostsRouter = Router();

const { routeProtect } = protections;
const {
  createPost,
  findPosts,
  findPost,
  updatePost,
  deletePost,
} = postController;
// create new post
PostsRouter.post("/", routeProtect, createPost);

// retrieve all posts
PostsRouter.get("/", findPosts);

// retrive single post by id
PostsRouter.get("/:id", findPost);

// update posts
PostsRouter.put("/:id", routeProtect, updatePost);

// delete post by id
PostsRouter.delete("/:id", routeProtect, deletePost);

export default PostsRouter;
