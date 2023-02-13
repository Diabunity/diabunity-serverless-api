import { Context, Next } from 'hono';
import { FlarebaseAuth } from '@marplex/flarebase-auth';

import { HttpException } from '../exceptions/HttpException';
import { Env } from '../types';

let auth: FlarebaseAuth;
const initializeAuth = (config: Env) => {
  if (!auth) {
    auth = new FlarebaseAuth({
      apiKey: config.FIREBASE_API_KEY,
      projectId: config.FIREBASE_PROJECT_ID,
      privateKey: config.FIREBASE_PRIVATE_KEY,
      serviceAccountEmail: config.FIREBASE_SERVICE_ACCOUNT_EMAIL,
    });
  }
  return auth;
};

const verifyTokenMiddleware = async (c: Context, next: Next) => {
  initializeAuth(c.env as Env);
  const token = c.req.header('Authorization')?.replace(/^Bearer\s/, '');
  if (!token) {
    throw new HttpException(401, 'Missing Authorization header');
  }
  let user;
  try {
    user = await auth.verifyIdToken(token);
  } catch {
    throw new HttpException(401, 'Invalid token');
  }
  c.set('user', user);
  await next();
};

const validateCurrentUserMiddleware = async (c: Context, next: Next) => {
  const { user_id } = c.get('user');
  const id = c.req.param('id');

  if (user_id !== id) {
    throw new HttpException(
      403,
      'You are not authorized to perform this action'
    );
  }

  await next();
};

export { verifyTokenMiddleware, validateCurrentUserMiddleware };
