import { Router } from 'express';
import userRouter from './user';
import postRouter from './post';

const allRoutes = Router();

allRoutes.use('/posts', postRouter);
allRoutes.use('/users', userRouter);

export default allRoutes;