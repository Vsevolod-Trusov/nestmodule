import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'auth/auth.module';
import { AuthService } from 'auth/auth.service';

@Module({
  imports: [AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
