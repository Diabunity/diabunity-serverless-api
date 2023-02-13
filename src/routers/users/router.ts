import UsersController from '@controllers/users.controller';
import { validateCurrentUserMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { userIdParam } from '@models/user';
import { ParamPropertyKey } from '@types';
import { Hono } from 'hono';

const usersRouter = new Hono();

usersRouter.get(
  '/:id',
  validationMiddleware(userIdParam, ParamPropertyKey.param),
  validateCurrentUserMiddleware,
  UsersController.getUser
);

export { usersRouter };
