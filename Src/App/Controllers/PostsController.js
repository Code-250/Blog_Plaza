import postService from "../../Database/Services/post.js";
import errorSuccessHandler from "../utils/errSuccHandler.js";

const {
  createPost,
  getPosts,
  getOnePost,
  deletePost,
  updatePost,
} = postService;

const { errorHandler, successHandler } = errorSuccessHandler;

class postController {
  // CREATE A POST
  static async createPost(req, res) {
    const { title, description, photo } = req.body;

    const post = await createPost({
      title,
      description,
    });
    return successHandler(res, 200, "Post is created SUccessfully", post);
  }

  // finding a post
  static async findPosts(req, res, next) {
    const post = await getPosts();
    if (post) {
      return successHandler(res, 200, "All posts retrieved", post);
    } else {
      return next(
        errorHandler(res, 404, "looks like there are no post at all :)")
      );
    }
  }

  // get post by Id

  static async findPost(req, res, next) {
    const post = await getOnePost({ id: req.params.id });
    if (!post) {
      return next(
        errorHandler(
          res,
          404,
          `unfortunately post with id ${req.params.id} is not available`
        )
      );
    }
    return successHandler(
      res,
      200,
      `successfully retrieved Post with id ${req.params.id}`,
      post
    );
  }

  // update post
  static async updatePost(req, res, next) {
    // check if the post exist before updating it
    const foundPost = await getOnePost({ id: req.params.id });

    // if we have it then update
    if (foundPost) {
      const updatedPost = await updatePost(req.body, {
        id: req.params.id,
      });
      return successHandler(
        res,
        201,
        `successfully updated post wit id ${req.params.id}`,
        updatedPost
      );
    } else {
      return next(errorHandler(res, 404, "Post does not exist"));
    }
  }

  // delete posts

  static async deletePost(req, res, next) {
    // check if the post we want to delete exists

    // if post exist

    const removePost = await deletePost({ id: req.params.id });
    if (!removePost) {
      return next(
        errorHandler(res, 404, `Post with id ${req.params.id} does not exist`)
      );
    }
    return successHandler(
      res,
      200,
      `successfully deleted post with id ${req.params.id}`,
      removePost
    );
  }
}
export default postController;
