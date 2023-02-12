import { Context } from 'hono';
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

const authMiddleware = async (c: Context, next: () => Promise<void>) => {
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

export default authMiddleware;
