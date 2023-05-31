import { Injectable } from '@nestjs/common';
//
import { PrismaService } from '../prisma/prisma.service';
// Dtos
import { CreateRestaurantDto } from './dtos/CreateRestaurantDto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(restaurantData: CreateRestaurantDto) {
    const { password, ...rest } = restaurantData;

    const restaurant = await this.prisma.restaurants.create({
      data: {
        ...rest,
        auth: {
          create: {
            password,
          },
        },
      },
    });

    return restaurant;
  }
}
