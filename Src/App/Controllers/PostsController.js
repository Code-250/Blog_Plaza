import postServices from '../../database/services/postServies';
import { postValidate, validate } from '../validations/index';
import responseHandler from '../utils/respHandler';
import uploader from '../../database/config/photoConfig';
import Models from '../../database/models/index';

const { Comment } = Models;
const { respSuccess, respError } = responseHandler;
const {
  createPost,
  findPost,
  findPosts,
  createComment,
  commentFind,
  updatePost,
  deletePost,
} = postServices;
class postController {
  static async createPost(req, res) {
    console.log(req.body);
    // checking if the title of the post is already used
    const posts = { ...req.body };
    const { details: errors } = validate(postValidate.createSchema, posts);
    if (errors) return respError(res, 409, errors[0].message, errors[0]);
    //the create a post

    const titleExist = await findPost({ title: req.body.title });
    if (titleExist) return respError(res, 208, 'title already exists');
    // const userId = req.User.id;
    const postcreate = await createPost({
      ...posts,
      imageUrl: '',
    });
    //
    console.log(postcreate);

    // ;
    if (req.files) {
      const tmp = req.files.imageUrl.tempFilePath;
      const imageFile = await uploader.upload(tmp, (_, results) => results);
      postcreate.imageUrl = imageFile.url;
      postcreate.save();
    }
    if (!postcreate) return respError(res, 404, 'post not created');

    return respSuccess(res, 201, 'post created successfully', postcreate);
  }
  static async findPost(req, res) {
    const post = await findPost({ id: req.params.id });
    if (!post) return respError(res, 404, 'post not found');

    return respSuccess(res, 200, `this is post with id ${req.params.id}`, post);
  }

  static async findPosts(req, res) {
    const allPosts = await findPosts();
    if (allPosts.length === 0) return respError(res, 410, 'no post found');

    return respSuccess(res, 200, 'all posts retrieved', allPosts);
  }
  static async updatePost(req, res) {
    const foundPost = await findPost({ id: req.params.id });
    if (!foundPost) return respError(res, 404, 'post does not exist');

    const { details: errors } = validate(postValidate.updateSchema, req.body);
    if (errors) return respError(res, 409, errors[0].message, errors[0]);
    const postUpdate = await updatePost(req.body, { id: req.params.id });

    return respSuccess(res, 200, 'post updated successfully', postUpdate);
  }
  static async deletePost(req, res) {
    const foundPost = await findPost({ id: req.params.id });
    if (!foundPost) return respError(res, 404, 'post not found fordelete');

    const postDelete = await deletePost({ id: req.params.id });
    return respSuccess(res, 200, 'post deleted successfully');
  }
}
export default postController;