import Post from "../Models/PostsModel.js";

class postService {
  static async createPost(post) {
    const createdPost = await Post.create(post);
    return createdPost;
  }
  static async getPosts() {
    const Posts = await Post.findAll();
    return Posts;
  }
  static async getOnePost(param) {
    const OnePost = await Post.findOne({ where: param });
    return OnePost;
  }
  static async updatePost(posts, param) {
    const updatedPost = await Post.update(posts, { where: [param] });
    return updatedPost;
  }
  // delete post

  static async deletePost(param) {
    const deletedPost = await Post.destroy({ where: param });
    return deletedPost;
  }
}
export default postService;
