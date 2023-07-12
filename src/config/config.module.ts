import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ENV_PATH } from 'common';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [ENV_PATH],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
