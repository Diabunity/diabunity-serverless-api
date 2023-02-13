import { HttpException } from '@exceptions/HttpException';
import { ParamPropertyKey } from '@types';
import { Context, Next } from 'hono';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default function validationMiddleware(
  schema: z.ZodSchema<any>,
  property: ParamPropertyKey
) {
  return async (c: Context, next: Next) => {
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
