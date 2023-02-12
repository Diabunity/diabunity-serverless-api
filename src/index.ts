import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello World!');
});

app.get('/static/*', serveStatic({ root: './' }));

export default app;
