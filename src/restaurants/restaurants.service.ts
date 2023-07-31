import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { ERRORS_HTTP } from 'src/constants/messages';
import { idRols } from 'src/constants/idRols';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async getAllRestaurants() {
    return this.prisma.restaurants.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        menus: true,
      },
    });
  }

  async getOneRestaurant(restaurant_id: string) {
    return this.prisma.restaurants.findFirst({
      where: {
        id: restaurant_id,
        deleted_at: null,
      },
      include: {
        menus: true,
      },
    });
  }

  async createRestaurant(data: CreateRestaurantDto) {
    const { password, ...rest } = data;

    const restaurantExist = await this.prisma.restaurants.findUnique({
      where: {
        email: rest.email,
      },
    });

    if (restaurantExist) throw ERRORS_HTTP['REGISTERED_EMAIL'];

    const hash = await bcrypt.hash(password, 10);

    const restaurant = await this.prisma.restaurants.create({
      data: {
        ...rest,
        employees: {
          create: {
            rol_id: idRols['admin'],
            name: 'admin',
            last_name: 'admin',
            email: rest.email,
            auth: {
              create: {
                password: hash,
              },
            },
          },
        },
      },
    });

    return restaurant;
  }

  async updateRestaurant(data: UpdateRestaurantDto, admin_id: string) {
    const _admin = await this.prisma.employees.findFirst({
      where: {
        AND: {
          id: admin_id,
          rol_id: idRols['admin'],
        },
      },
      include: {
        restaurants: true,
      },
    });

    // El id y el email no se pued emodificar
    if (!_admin || data['id'] || data['email']) throw ERRORS_HTTP['RESTRICTED'];

    const { restaurants } = _admin;

    const restaurant = await this.prisma.restaurants.update({
      where: {
        id: restaurants?.id,
      },
      data: {
        ...data,
      },
    });

    return restaurant;
  }
}
