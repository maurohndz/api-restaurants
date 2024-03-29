import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Utils
import { getEnvFiles } from './utils/getEnvFiles';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import config from './config/config';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFiles(),
      load: [config],
    }),
    RestaurantsModule,
    AuthModule,
    PrismaModule,
    EmployeesModule,
    MenusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
