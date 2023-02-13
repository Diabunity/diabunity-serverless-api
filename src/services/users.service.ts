type User = {}; // TODO: This must be a MODEL

export default class UsersService {
  public static async getUserById(id: string, db: any): Promise<User> {
    const user = await db.findOne('user', { filter: { _id: id } });

    return user;
  }
}
