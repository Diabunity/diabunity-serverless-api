import UsersController from '@controllers/users.controller';
import { validateCurrentUserMiddleware } from '@middlewares/auth.middleware';
import { Hono } from 'hono';

const usersRouter = new Hono();

usersRouter.get('/:id', validateCurrentUserMiddleware, UsersController.getUser);

export { usersRouter };
