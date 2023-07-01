import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { verify } from 'src/utils/jwt';
import { HttpErros } from 'src/utils/HttpErros';
import { ERRORS_HTTP } from 'src/constants/messages';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.header['authorization'] || null;

      if (!token) throw ERRORS_HTTP['TOKEN'];

      await verify(token)
      
      return true;
    } catch (error) {
      throw new HttpErros(error);
    }
  }
} 