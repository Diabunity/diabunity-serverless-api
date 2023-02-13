import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { StatusCode } from 'hono/utils/http-status';
import { sentry } from '@hono/sentry';
import { prettyJSON } from 'hono/pretty-json';

import { HttpException } from '@exceptions/HttpException';
import { usersRouter } from '@routers/users';
import { Env } from '@types';
import dbMiddleware from '@middlewares/db.middleware';
import { verifyTokenMiddleware } from '@middlewares/auth.middleware';

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
api.use('*', verifyTokenMiddleware, dbMiddleware);
api.get('/firebase', async (c) => {
  const { user_id } = c.get('user') as any;

  const db = c.get('db') as any;
  const result = await db.findOne('user', { filter: { _id: user_id } });
  //const result = await db.collection('user').find({ filter: { _id: user_id } });

  return c.json(result);
});
api.route('/users', usersRouter);

app.route('/v1', api);

export default app;
