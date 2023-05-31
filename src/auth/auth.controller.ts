import { Controller, Post, Body } from '@nestjs/common';
//
import { AuthService } from './auth.service';
// Dtos
import { CreateRestaurantValidation } from '../validations'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() restaurant: CreateRestaurantValidation) {
    return this.authService.register(restaurant);
  }
}
