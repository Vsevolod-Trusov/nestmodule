import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import {
  BASE_USER_URLS,
  COOKIES_HEADERS,
  EXPIRED_REFRESH_COOKIE_MAX_AGE,
  EXPIRED_ACCESS_COOKIE_MAX_AGE,
  ROLES,
  SUCCESSFULLY_LOGOUT,
  URL_PREFIX,
  SUCCESS_SIGN_IN,
  STRATEGIES_NAMES,
} from 'common';
import { AuthDto, CreateUserDto } from 'dto';
import { AuthService } from 'auth/auth.service';
import { RoleGuard } from 'auth/guard';
import { Roles } from 'auth/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller(URL_PREFIX)
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post(BASE_USER_URLS.SIGN_UP)
  async signUp(@Body() createdUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createdUserDto);

    return user;
  }

  @Post(BASE_USER_URLS.SIGN_IN)
  async signIn(@Body() authDate: AuthDto, @Res() response: Response) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      authDate,
    );

    response.cookie(COOKIES_HEADERS.REFRESH, refreshToken, {
      maxAge: EXPIRED_REFRESH_COOKIE_MAX_AGE,
      httpOnly: true,
    });

    response.cookie(COOKIES_HEADERS.ACCESS, accessToken, {
      maxAge: EXPIRED_ACCESS_COOKIE_MAX_AGE,
      httpOnly: true,
    });

    return response.send(SUCCESS_SIGN_IN);
  }

  @Roles(ROLES.USER)
  @UseGuards(
    AuthGuard([STRATEGIES_NAMES.ACCESS, STRATEGIES_NAMES.REFRESH]),
    RoleGuard,
  )
  @Get(BASE_USER_URLS.LOG_OUT)
  logout(@Res() response: Response): Response {
    response.clearCookie(COOKIES_HEADERS.REFRESH);
    response.clearCookie(COOKIES_HEADERS.ACCESS);
    return response.send(SUCCESSFULLY_LOGOUT);
  }
}
