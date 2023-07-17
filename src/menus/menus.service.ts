import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { idRols } from 'src/constants/idRols';
import { CreateMenusDto } from './dtos/CreateMenuDto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async getMenusByRestaurants(restaurant_id: string) {
    return this.prisma.menus.findMany({
      where: {
        AND: {
          restaurant_id,
          status: true,
          deleted_at: null,
        },
      },
    });
  }

  async getMenu(menu_id: string) {
    return this.prisma.menus.findMany({
      where: {
        AND: {
          id: menu_id,
          status: true,
          deleted_at: null,
        },
      },
    });
  }

  async create(user_id: string, restaurant_id: string, _menu: CreateMenusDto) {
    const user = await this.prisma.employees.findUnique({
      where: {
        id: user_id,
      },
    });

    if (user.rol_id !== idRols['employee']) throw '';

    const menu = await this.prisma.menus.create({
      data: {
        restaurant_id,
        status: true,
        ..._menu,
      },
    });

    return menu;
  }
}
