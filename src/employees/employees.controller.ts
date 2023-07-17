import {
  Controller,
  Post,
  Patch,
  UseGuards,
  Body,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { EmployeesService } from './employees.service';
import { HttpErros } from 'src/utils/HttpErros';
import { HttpResponse } from 'src/utils/HttpResponse';
import { CreateEmployee, UpdateEmployee } from 'src/validations';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Empleados')
@ApiBearerAuth('authorization')
@Controller('employees')
@UseGuards(AuthGuard)
export class EmployeesController {
  constructor(private readonly employeesSevice: EmployeesService) {}
  @Get()
  async getEmployees(@Res() res: any) {
    return await this.employeesSevice
      .getAllEmployeeToRestaurant(res?.restaurant_id)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'SUCCESS');
        return res.send(httpResponse.getResponse());
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }

  @Get('/:employee_id')
  async getEmployeeById(
    @Param('employee_id') employee_id: string,
    @Res() res: any,
  ) {
    return await this.employeesSevice
      .getOneEmployeeToRestaurant(employee_id, res?.restaurant_id)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'SUCCESS');
        return res.send(httpResponse.getResponse());
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }

  @Post()
  async resgisterEmployees(@Body() employee: CreateEmployee, @Res() res: any) {
    return await this.employeesSevice
      .create({
        ...employee,
        restaurant_id: res?.restaurant_id,
      })
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'CREATED');
        return res.send(httpResponse.getResponse());
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }

  @Patch()
  async updateEmployees(@Body() employee: UpdateEmployee, @Res() res: any) {
    return await this.employeesSevice
      .update(employee, res?.user_id, res?.restaurant_id)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'UPDATED');
        return res.send(httpResponse.getResponse());
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }
}
