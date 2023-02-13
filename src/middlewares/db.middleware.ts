import { Context } from 'hono';
import { Env } from '@types';
import { HttpException } from '@exceptions/HttpException';
import { initDatabase } from 'mongo-http';
import DBManager from '@utils/db';

let db: unknown;

const initializeDB = (config: Env) => {
  if (!db) {
    db = initDatabase({
      appId: config.MONGO_APP_ID,
      apiKey: config.MONGO_API_KEY,
      databaseName: config.MONGO_DB_NAME,
      dataSource: config.MONGO_DATA_SOURCE,
    });
  }

  return db;
};

const dbMiddleware = async (c: Context, next: () => Promise<void>) => {
  try {
    initializeDB(c.env as Env);
    c.set('db', DBManager.getInstance(db));
  } catch (e) {
    throw new HttpException(500, 'Failed to initialize database');
  }

  await next();
};

export default dbMiddleware;
