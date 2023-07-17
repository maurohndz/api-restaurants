import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { verify } from 'src/utils/jwt';
import { HttpErros } from 'src/utils/HttpErros';
import { ERRORS_HTTP } from 'src/constants/messages';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private permissions: string[], private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const { user_id, restaurant_id } = context.switchToHttp().getResponse();

      const _user = await this.prisma.employees.findUnique({
        where: {
          id: user_id,
        },
        include: {
          roles: {
            include: {
              roles_permissions: true,
            },
          },
        },
      });

      console.log(_user);

      return true;
    } catch (error) {
      throw new HttpErros(error);
    }
  }
}
