import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MenusController],
  providers: [MenusService],
  imports: [PrismaModule],
})
export class MenusModule {}
