import postController from '../controller/postController';
import routeProtection from '../middleware/routeProtect';

const { postCreate } = routeProtection;
const {
  createPost,
  findPost,
  findPosts,
  updatePost,
  deletePost,
} = postController;

const postRouter = Router();

postRouter.route('/').post(postCreate, createPost).get(findPosts);

postRouter
  .route('/:id')
  .get(findPost)
  .put(postCreate, updatePost)
  .delete(postCreate, deletePost);
export default postRouter;