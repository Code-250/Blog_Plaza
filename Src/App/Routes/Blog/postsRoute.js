import { Router } from "express";
import "@babel/polyfill";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../../Controllers/PostsController.js";

const PostsRouter = Router();

// create new post
PostsRouter.post("/", createPost);

// retrieve all posts
PostsRouter.get("/", getPosts);

// retrive single post by id
PostsRouter.get("/:id", getPostById);

// update posts
PostsRouter.put("/:id", updatePost);

// delete post by id
PostsRouter.delete("/:id", deletePost);

export default PostsRouter;
