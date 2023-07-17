import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Res,
  Patch,
  Get,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurant, UpdateRestaurant } from '../validations';
import { HttpResponse } from 'src/utils/HttpResponse';
import { HttpErros } from 'src/utils/HttpErros';
import { AuthGuard } from 'src/guards/AuthGuard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Restaurantes')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Get()
  async getAll() {
    return await this.restaurantService
      .getAllRestaurants()
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'SUCCESS');
        return httpResponse.getResponse();
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }

  @Get('/:restaurant_id')
  async getOne(@Param('restaurant_id') restaurant_id: string) {
    return await this.restaurantService
      .getOneRestaurant(restaurant_id)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'SUCCESS');
        return httpResponse.getResponse();
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }

  @Post('register')
  async register(@Body() restaurant: CreateRestaurant) {
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

  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() restaurantData: UpdateRestaurant, @Res() res: any) {
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
