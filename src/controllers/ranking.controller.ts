import { Context } from 'hono';
import RankingService from '@services/ranking.service';

export default class RankingController {
  public static async getRanking(c: Context) {
    const db = c.get('db');
    const month = c.req.param('month');

    const ranking = await RankingService.getRanking(db, parseInt(month));
    c.json(ranking);
  }
}
