import { Hono } from 'hono';
import RankingController from '@controllers/ranking.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { rankingParam } from '@models/ranking';
import { ParamPropertyKey } from '@types';

const rankingRouter = new Hono();

rankingRouter.get(
  '/:month',
  validationMiddleware(rankingParam, ParamPropertyKey.param),
  RankingController.getRanking
);

export { rankingRouter };
