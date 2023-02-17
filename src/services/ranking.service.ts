type Ranking = {}; // TODO: define type

export default class RankingService {
  public static async getRanking(db: any, month: number): Promise<Ranking> {
    // const ranking = await db.findOne();
    const ranking = await Promise.resolve({}); // TODO: implement

    return ranking;
  }
}
