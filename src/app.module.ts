import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Utils
import { getEnvFiles } from './utils/getEnvFiles';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UtilsModule } from './utils/utils.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFiles(),
      load: [config]
    }),
    RestaurantsModule,
    AuthModule,
    PrismaModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

