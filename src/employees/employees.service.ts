import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dtos/CreateEmployeeDto';
import { UpdateEmployeeDto } from './dtos/UpdateEmployeeDto';
import * as bcrypt from 'bcrypt';
import { idRols } from 'src/constants/idRols';
import { ERRORS_HTTP } from 'src/constants/messages';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async getAllEmployeeToRestaurant(restaurant_id: string) {
    return this.prisma.employees.findMany({
      where: {
        AND: {
          restaurant_id,
          deleted_at: null,
          NOT: {
            rol_id: idRols['admin'],
          },
        },
      },
    });
  }

  async getOneEmployeeToRestaurant(token_id: string, restaurant_id: string) {
    return this.prisma.employees.findFirst({
      where: {
        AND: {
          id: token_id,
          restaurant_id,
        },
      },
    });
  }

  async create(_employee: CreateEmployeeDto) {
    const { password, rol_id, ...rest } = _employee;

    const employeeExist = await this.prisma.employees.findUnique({
      where: { email: rest?.email },
    });

    if (employeeExist) throw ERRORS_HTTP['DATA_RECORDED'];

    const hash = await bcrypt.hash(password, 10);

    const employee_rol = idRols['employee'];

    if (rol_id === idRols['admin']) {
      throw ERRORS_HTTP['ADMIN_ROL'];
    }

    const employee = await this.prisma.employees.create({
      data: {
        ...rest,
        rol_id: rol_id ?? employee_rol,
        auth: {
          create: {
            password: hash,
          },
        },
      },
    });

    return employee;
  }

  async update(
    _employee: UpdateEmployeeDto,
    token_id: string,
    restaurant_id: string,
  ) {
    const { id, ...rest } = _employee;

    const _exist = await this.prisma.employees.findFirst({
      where: {
        AND: {
          id,
          restaurant_id,
        },
      },
    });

    if (_exist) throw ERRORS_HTTP['RESTRICTED'];

    const employee = await this.prisma.employees.update({
      where: {
        id,
      },
      data: {
        name: rest.name,
        last_name: rest.last_name,
      },
    });

    return employee;
  }
}
