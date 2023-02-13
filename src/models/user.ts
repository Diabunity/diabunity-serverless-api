import { z } from 'zod';

export const userIdParam = z.object({
  id: z.string(),
});
