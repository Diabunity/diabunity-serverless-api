import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static';
import { usersRouter } from '@routers/users';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello World!');
});

app.route('/users', usersRouter);

app.get('/static/*', serveStatic({ root: './' }));

export default app;
