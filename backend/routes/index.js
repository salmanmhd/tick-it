import express from 'express';
import listRouter from './list.js';
import todosRouter from './todos.js';
import userRouter from './user.js';

const mainRouter = express.Router();

// mainRouter.use('/user', userRouter);
// mainRouter.use('/list', listRouter);
mainRouter.use('/todo', todosRouter);

export default mainRouter;
