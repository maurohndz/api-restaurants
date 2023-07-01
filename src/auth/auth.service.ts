import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from '../utils/jwt'
// Dtos
import { LoginRestaurantDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(credentials: LoginRestaurantDto) {
    const _employee = await this.prisma.employees.findUnique({
      where: {
        email: credentials.email,
      },
      include: {
        auth: true,
      },
    });

    if (!_employee) throw 'LOGIN';

    const { auth, ...employee } = _employee;

    const isValid = await bcrypt.compare(
      credentials.password,
      auth.password,
    );

    if (!isValid) throw 'LOGIN';

    const token = await jwt.sign(employee)

    return {
      authorization: token,
      data: employee
    }
  }
}
