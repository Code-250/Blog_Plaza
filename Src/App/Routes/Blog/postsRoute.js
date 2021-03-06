import { Router } from "express";
import "@babel/polyfill";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../../Controllers/PostsController.js";
import { checkAuth } from "../../Middlewares/checkAuth.js";

const PostsRouter = Router();

// create new post
PostsRouter.post("/", checkAuth, createPost);

// retrieve all posts
PostsRouter.get("/", getPosts);

// retrive single post by id
PostsRouter.get("/:id", getPostById);

// update posts
PostsRouter.put("/:id", checkAuth, updatePost);

// delete post by id
PostsRouter.delete("/:id", checkAuth, deletePost);

export default PostsRouter;
