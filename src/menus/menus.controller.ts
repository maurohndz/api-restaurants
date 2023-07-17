import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { MenusService } from './menus.service';
import { HttpErros } from 'src/utils/HttpErros';
import { HttpResponse } from 'src/utils/HttpResponse';
import { CreateMenu } from 'src/validations';

@ApiTags('Menus')
@ApiBearerAuth('authorization')
@Controller('menus')
@UseGuards(AuthGuard)
export class MenusController {
  constructor(private readonly menusSevice: MenusService) {}

  @Get('/:restaurant_id')
  async getAllMenus(@Param('restaurant_id') restaurant_id: string) {
    return await this.menusSevice
      .getMenusByRestaurants(restaurant_id)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'SUCCESS');
        return httpResponse.getResponse();
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }

  @Get('/:menu_id')
  async getMenu(@Param('menu_id') menu_id: string) {
    return await this.menusSevice
      .getMenu(menu_id)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'SUCCESS');
        return httpResponse.getResponse();
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }

  @Post()
  async createMenu(@Body() menu: CreateMenu, @Res() res: any) {
    return await this.menusSevice
      .create(res?.user_id, res?.restaurant_id, menu)
      .then((data) => {
        const httpResponse = new HttpResponse(data, 'CREATED');
        return res.send(httpResponse.getResponse());
      })
      .catch((error) => {
        throw new HttpErros(error);
      });
  }
}
