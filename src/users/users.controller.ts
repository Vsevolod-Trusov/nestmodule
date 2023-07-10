import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { BASE_USER_URLS, URL_PREFIX } from 'common';
import { AuthDto, CreateUserDto } from 'dto';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/guard/jwt.guard';
import { JwtRefreshGuard } from 'auth/guard/jwt-refresh.guard';

@Controller(URL_PREFIX)
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post(BASE_USER_URLS.SIGN_UP)
  signUp(@Body() createdUserDto: CreateUserDto) {
    return this.authService.signUp(createdUserDto);
  }

  @Post(BASE_USER_URLS.SIGN_IN)
  signIn(@Body() authDate: AuthDto) {
    return this.authService.signIn(authDate);
  }

  @UseGuards(JwtAuthGuard)
  @Get(BASE_USER_URLS.LOG_OUT)
  logout(@Req() request: Request) {
    const { user } = request;

    return this.authService.logOut(user['email']);
  }

  @UseGuards(JwtRefreshGuard)
  @Get(BASE_USER_URLS.REFRESH)
  refreshTokens(@Req() request: Request) {
    const { user } = request;

    const userId = user['sub'];
    const refreshToken = user['refreshToken'];

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
