import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { ERRORS_HTTP } from 'src/constants/messages';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}
  
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
            rol_id: 'c96c129c-9c55-4d68-add1-819edde83f0c',
            name: 'admin',
            last_name: 'admin',
            email: rest.email,
            auth: {
              create: {
                password: hash,
              }
            }
          }
        }
      },
    })
 
    return restaurant;
  }
}
