import { Module } from '@nestjs/common';
import { Jwt } from './jwt'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [Jwt],
  exports: [Jwt]
})
export class UtilsModule {}
