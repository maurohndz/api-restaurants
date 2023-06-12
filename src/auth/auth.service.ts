import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//
import { PrismaService } from '../prisma/prisma.service';
// Dtos
import { LoginRestaurantDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(credentials: LoginRestaurantDto) {
    const employee = await this.prisma.employees.findUnique({
      where: {
        email: credentials.email,
      },
      include: {
        auth: true,
      },
    });
    
    if (!employee) throw 'REGISTERED_EMAIL';
    // validar session activa
    // firma token
    // guardar session
    // responder
  }
}
