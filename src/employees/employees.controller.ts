import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Res,
  Response
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { EmployeesService } from './employees.service';
import { HttpErros } from 'src/utils/HttpErros';
import { HttpResponse } from 'src/utils/HttpResponse';
import { CreateEmployeeValidation } from 'src/validations/CreateEmployeeValidation';

@Controller('employees')
@UseGuards(AuthGuard)
export class EmployeesController {
  constructor(private readonly employeesSevice: EmployeesService) {}
  @Get()
  async getTestEmployees() {
    return true;
  }

  @Post()
  async resgisterEmployees(
    @Body() employee: CreateEmployeeValidation,
    @Res() res: any,
  ) {
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
}
