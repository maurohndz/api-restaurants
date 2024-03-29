import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { verify } from 'src/utils/jwt';
import { HttpErros } from 'src/utils/HttpErros';
import { ERRORS_HTTP } from 'src/constants/messages';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const response = context.switchToHttp().getResponse();
      const request = context.switchToHttp().getRequest();
      const token =
        request.header('authorization')?.replace('Bearer ', '') || null;

      if (!token) throw ERRORS_HTTP['TOKEN'];

      const data: any = await verify(token);

      response.restaurant_id = data?.restaurant_id;
      response.user_id = data?.id;

      return true;
    } catch (error) {
      throw new HttpErros(error);
    }
  }
}
