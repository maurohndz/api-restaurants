import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dtos/CreateEmployeeDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(_employee: CreateEmployeeDto) {
    const { password, rol_id, ...rest } = _employee;

    const hash = await bcrypt.hash(password, 10);

    const employee = await this.prisma.employees.create({
      data: {
        ...rest,
        rol_id: rol_id || '191fcec0-6e92-4573-a089-1e3a57cd2f3e',
        auth: {
          create: {
            password: hash
          }
        }
      }
    })

    return employee;
  }
}
