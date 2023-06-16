import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//
import { PrismaService } from '../prisma/prisma.service';
import { Jwt } from '../utils/jwt'
// Dtos
import { LoginRestaurantDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: Jwt) {}

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

    const aaa = await bcrypt.compare(
      credentials.password,
      employee.auth.password,
    );

    if (aaa) throw 'REGISTERED_EMAIL';

    this.jwt.sing(89)

    // TODO: session

    // guardar session
    // responder
  }
}
