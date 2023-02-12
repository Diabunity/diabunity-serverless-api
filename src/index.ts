import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { sentry } from '@hono/sentry';
import { StatusCode } from 'hono/utils/http-status';
import { usersRouter } from '@routers/users';
import authMiddleware from '@middlewares/auth.middleware';
import { HttpException } from '@exceptions/HttpException';
import { Env } from './types';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello World!');
});
app.use('*', prettyJSON(), cors(), logger(), sentry());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));
app.onError((err, ctx) => {
  const error = err as HttpException;
  return ctx.json(
    {
      status: error.status,
      message: error.message,
    },
    error.status as StatusCode
  );
});

const api = new Hono<{ Bindings: Env }>();
api.use('*', authMiddleware);
api.get('/firebase', async (c) => {
  const user = c.get('user');
  return c.json(user);
});
api.route('/users', usersRouter);

app.route('/v1', api);

export default app;
