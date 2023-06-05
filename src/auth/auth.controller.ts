import { Controller, Post, Body, Response } from '@nestjs/common';
//
import { AuthService } from './auth.service';
// Dtos
import { CreateRestaurantValidation } from '../validations';
import { HttpErros } from 'src/utils/HttpErros';
import { HttpResponse } from 'src/utils/HttpResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() restaurant: CreateRestaurantValidation) {
    return await this.authService
      .register(restaurant)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'CREATED');
        return httpResponse.getResponse();
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }
}
