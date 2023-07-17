import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentials } from '../validations';
import { HttpErros } from 'src/utils/HttpErros';
import { HttpResponse } from 'src/utils/HttpResponse';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginCredentials) {
    return this.authService
      .login(credentials)
      .then((data) => {
        const httpResponse = new HttpResponse(data);
        return httpResponse.getResponse();
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }
}
