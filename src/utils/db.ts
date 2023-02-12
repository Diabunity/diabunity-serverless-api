import { HttpException } from '@exceptions/HttpException';
import { CollectionName } from '@types';

export default class DBManager {
  private db: any;
  constructor(db: any) {
    this.db = db;
  }

  async find(collection: CollectionName, filter: any) {
    try {
      const result = await this.db.collection(collection).find(filter);
      if (!result.isSuccess || result.error) {
        throw new Error(result.error);
      }
      return result.documents;
    } catch (e) {
      const error = e as Error;
      throw new HttpException(
        500,
        `Failed to find documents - ${error.message}`
      );
    }
  }
  async findOne(collection: CollectionName, filter: any) {
    try {
      const result = await this.db.collection(collection).findOne(filter);
      if (!result.isSuccess || result.error) {
        throw new Error(result.error);
      }
      return result.document;
    } catch (e) {
      const error = e as Error;
      throw new HttpException(
        500,
        `Failed to find document - ${error.message}`
      );
    }
  }
}
