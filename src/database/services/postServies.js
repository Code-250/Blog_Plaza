import Models from '../models/index';

const { Post, Comment } = Models;

class postServices {
  static async createPost(post) {
    const createdPost = await Post.create(post);
    return createdPost;
  }
  static async findPost(params) {
    const post = await Post.findOne({ where: params });
    return post;
  }
  static async findPosts() {
    const posts = await Post.findAll();
    return posts;
  }
  static async updatePost(post, params) {
    const updatePost = await Post.update(post, { where: [params] });
    return updatePost;
  }
  static async deletePost(params) {
    const deletedpost = await Post.destroy({ where: params });
    return deletedpost;
  }
}

export default postServices;