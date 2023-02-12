import { HttpException } from '@exceptions/HttpException';
import { CollectionName } from '@types';

export default class DBManager {
  private static instance: DBManager;
  private db: any;
  constructor(db: any) {
    this.db = db;
  }

  static getInstance(db: any): DBManager {
    if (!DBManager.instance) {
      DBManager.instance = new DBManager(db);
    }
    return DBManager.instance;
  }

  private handleError(operation: string, error: Error) {
    throw new HttpException(
      500,
      `Failed to ${operation} documents - ${error.message}`
    );
  }

  async find(collection: CollectionName, filter: any) {
    try {
      const result = await this.db.collection(collection).find(filter);
      if (!result.isSuccess || result.error) {
        this.handleError('find', new Error(result.error));
      }
      return result.documents;
    } catch (e) {
      this.handleError('find', e as Error);
    }
  }
  async findOne(collection: CollectionName, filter: any) {
    try {
      const result = await this.db.collection(collection).findOne(filter);
      if (!result.isSuccess || result.error) {
        this.handleError('findOne', new Error(result.error));
      }

      return result.document;
    } catch (e) {
      this.handleError('findOne', e as Error);
    }
  }
}
