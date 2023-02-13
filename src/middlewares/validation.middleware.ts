import { HttpException } from '@exceptions/HttpException';
import { Context } from 'hono';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default function validationMiddleware(
  schema: z.ZodSchema<any>,
  property: 'param' // TODO: FULFILL THE REST OF THE PROPERTIES
) {
  return async (c: Context, next: () => Promise<void>) => {
    const result = schema.safeParse(c.req[property]());

    if (!result.success) {
      throw new HttpException(
        400,
        `${property} ${fromZodError(result.error)} `
      );
    } else {
      await next();
    }
  };
}
