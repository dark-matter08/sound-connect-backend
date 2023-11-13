import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetBaseUrl = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<any>();
    const protocol = request.protocol;
    const host = request.get('host');

    const baseUrl = `${protocol}://${host}`;

    return baseUrl;
  },
);
