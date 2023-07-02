import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dtos/CreateEmployeeDto';
import * as bcrypt from 'bcrypt';
import { idRols } from 'src/constants/idRols';
import { ERRORS_HTTP } from 'src/constants/messages';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(_employee: CreateEmployeeDto) {
    const { password, rol_id, ...rest } = _employee;

    const employeeExist = await this.prisma.employees.findUnique({
      where:  { email: rest?.email }, 
    })
    
    if (employeeExist) throw ERRORS_HTTP['DATA_RECORDED'];

    const hash = await bcrypt.hash(password, 10);

    let employee_rol = idRols['employee'];

    if (rol_id === idRols['admin']) {
      throw ERRORS_HTTP['ADMIN_ROL'];
    }

    const employee = await this.prisma.employees.create({
      data: {
        ...rest,
        rol_id: rol_id || employee_rol,
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
