import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Utils
import { getEnvFiles } from './utils/getEnvFiles';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: getEnvFiles()
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
