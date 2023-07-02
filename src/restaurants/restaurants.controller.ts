import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantValidation } from '../validations';
import { HttpResponse } from 'src/utils/HttpResponse';
import { HttpErros } from 'src/utils/HttpErros';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Post('register')
  async register(@Body() restaurant: CreateRestaurantValidation) {
    return await this.restaurantService
      .createRestaurant(restaurant)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'CREATED');
        return httpResponse.getResponse();
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }

  @UseGuards(AuthGuard)
  async update(@Body() restaurantData) {
    return await this.restaurantService
      .updateRestaurant(restaurantData)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'UPDATED');
        return httpResponse.getResponse();
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }
}
