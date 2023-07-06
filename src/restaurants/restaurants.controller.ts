import { Controller, Get, Post, Body, UseGuards, Res, Patch } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantValidation } from '../validations';
import { HttpResponse } from 'src/utils/HttpResponse';
import { HttpErros } from 'src/utils/HttpErros';
import { AuthGuard } from 'src/guards/AuthGuard';
import { UpdateRestaurantDto } from './dtos';

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
  @Patch()
  async update(@Body() restaurantData: UpdateRestaurantDto, @Res() res: any,) {
    const admin_id = res?.user_id;

    return await this.restaurantService
      .updateRestaurant(restaurantData, admin_id)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'UPDATED');
        return res.send(httpResponse.getResponse());
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }
}
