import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//
import { PrismaService } from '../prisma/prisma.service';
// Dtos
import { CreateRestaurantDto } from './dtos/CreateRestaurantDto';
import { HttpErros } from '../utils/HttpErros'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(restaurantData: CreateRestaurantDto) {
    const { password, ...rest } = restaurantData;

    const restaurantExist = await this.prisma.restaurants.findUnique({
      where: {
        email: rest.email,
      },
    });

    if (restaurantExist) throw 'REGISTERED_EMAIL';

    const hash = await bcrypt.hash(password, 10);

    const restaurant = await this.prisma.restaurants.create({
      data: {
        ...rest,
        auth: {
          create: {
            password: hash,
          },
        },
      },
    });

    return restaurant;
  }
}
