import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import {
  BASE_USER_URLS,
  COOKIES_HEADERS,
  REFRESH_FIELD,
  ROLES,
  SUB_FIELD,
  SUCCESSFULLY_LOGOUT,
  URL_PREFIX,
} from 'common';
import { AuthDto, CreateUserDto } from 'dto';
import { AuthService } from 'auth/auth.service';
import { RoleGuard, JwtAuthGuard, JwtRefreshGuard } from 'auth/guard';
import { Roles } from 'auth/role.decorator';

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

  @Roles(ROLES.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(BASE_USER_URLS.LOG_OUT)
  logout(@Res() response: Response): Response {
    response.clearCookie(COOKIES_HEADERS.REFRESH);
    return response.send(SUCCESSFULLY_LOGOUT);
  }

  @Roles(ROLES.USER)
  @UseGuards(JwtRefreshGuard, RoleGuard)
  @Get(BASE_USER_URLS.REFRESH)
  refreshTokens(@Req() request: Request) {
    const { user } = request;

    const userId = user[SUB_FIELD];
    const refreshToken = user[REFRESH_FIELD];

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
