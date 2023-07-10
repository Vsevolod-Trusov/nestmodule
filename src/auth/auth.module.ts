import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from 'users';
import { MongoDataServiceModule } from 'data-service';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshJwtStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  imports: [JwtModule.register({}), MongoDataServiceModule],
  controllers: [UsersController],
  providers: [AuthService, RefreshJwtStrategy, JwtStrategy],
})
export class AuthModule {}
