import { Hono } from 'hono';
import { usersRouter } from '@routers/users';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello World!');
});

app.route('/users', usersRouter);

export default app;
