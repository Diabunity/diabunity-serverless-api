import { Hono } from 'hono';

const usersRouter = new Hono();

usersRouter.get('/', (c) => {
  return c.text('Hello users!');
});

export { usersRouter };
