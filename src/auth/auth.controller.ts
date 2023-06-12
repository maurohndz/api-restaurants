import { Controller, Post, Body, Response } from '@nestjs/common';
//
import { AuthService } from './auth.service';
// Dtos
import { LoginValidation } from '../validations';
import { HttpErros } from 'src/utils/HttpErros';
import { HttpResponse } from 'src/utils/HttpResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginValidation) {}
}
