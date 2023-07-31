import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { idRols } from 'src/constants/idRols';
import { CreateMenusDto } from './dtos/CreateMenuDto';
import { UpdateMenusDto } from './dtos/UpdateMenuDto';
import { ERRORS_HTTP } from 'src/constants/messages';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async getAllMenus() {
    return this.prisma.menus.findMany({
      where: {
        status: true,
      },
      include: {
        restaurants: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async getMenusByRestaurants(restaurant_id: string) {
    return this.prisma.menus.findMany({
      where: {
        AND: {
          restaurant_id,
          status: true,
        },
      },
      include: {
        restaurants: {
          select: {
            name: true,
            id: true,
          },
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
        },
      },
      include: {
        restaurants: {
          select: {
            name: true,
            id: true,
          },
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

    if (user.rol_id !== idRols['employee']) throw ERRORS_HTTP['RESTRICTED'];

    const menu = await this.prisma.menus.create({
      data: {
        restaurant_id,
        ..._menu,
      },
    });

    return menu;
  }

  async update(
    user_id: string,
    restaurant_id: string,
    _menu: UpdateMenusDto,
    menu_id: string,
  ) {
    const user = await this.prisma.employees.findUnique({
      where: {
        id: user_id,
      },
      select: {
        rol_id: true,
        restaurants: {
          select: {
            menus: {
              select: {
                id: true,
              },
              where: {
                id: menu_id,
              },
            },
          },
        },
      },
    });

    if (
      user?.rol_id !== idRols['employee'] ||
      user?.restaurants?.menus?.length <= 0
    )
      throw ERRORS_HTTP['RESTRICTED'];

    const menu = await this.prisma.menus.update({
      where: {
        id: menu_id,
      },
      data: {
        ..._menu,
      },
    });

    return menu;
  }
}
