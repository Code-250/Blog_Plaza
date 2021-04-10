import { Router } from 'express';
import postController from '../controller/postController';

const { commentOnPost, removeComment } = postController;

const commentRouter = Router();

commentRouter.post('/comment/:postId', commentOnPost);

export default commentRouter;