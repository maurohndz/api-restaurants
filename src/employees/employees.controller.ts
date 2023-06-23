import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('employees')
@UseGuards(AuthGuard)
export class EmployeesController {
  @Get()
  async getTestEmployees() {
    return true;
  }

  @Post()
  async resgisterEmployees() {}
}

