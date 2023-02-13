import UsersService from '@services/users.service';
import { Context } from 'hono';

export default class UsersController {
  public static async getUser(c: Context) {
    const db = c.get('db');
    const userId = c.req.param('id');

    const user = await UsersService.getUserById(userId, db);

    return c.json(user);
  }
}
