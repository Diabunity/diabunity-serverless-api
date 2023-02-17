import { z } from 'zod';

export const rankingParam = z.object({
  month: z.number().int().lte(2),
});
