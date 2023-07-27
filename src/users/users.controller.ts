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
  ROLES,
  SUCCESSFULLY_LOGOUT,
  URL_PREFIX,
  STRATEGIES_NAMES,
  REFRESH_TOKEN_HEADER,
  ACCESS_TOKEN_HEADER,
  EXPIRED_ACCESS_COOKIE_MAX_AGE,
  EXPIRED_REFRESH_COOKIE_MAX_AGE,
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
    const { user, accessToken, refreshToken } = await this.authService.signIn(
      authDate,
    );

    // response.set(REFRESH_TOKEN_HEADER, refreshToken);
    // response.set(ACCESS_TOKEN_HEADER, accessToken);

    response.cookie('accessToken', accessToken, {
      maxAge: EXPIRED_ACCESS_COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'none',
    });

    response.cookie('refreshToken', refreshToken, {
      maxAge: EXPIRED_REFRESH_COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'none',
    });

    return response.send({ user });
  }

  @Roles(ROLES.USER)
  @UseGuards(
    AuthGuard([STRATEGIES_NAMES.ACCESS, STRATEGIES_NAMES.REFRESH]),
    RoleGuard,
  )
  @Get(BASE_USER_URLS.LOG_OUT)
  logout(@Res() response: Response): Response {
    response.removeHeader(REFRESH_TOKEN_HEADER);
    response.removeHeader(ACCESS_TOKEN_HEADER);
    return response.send(SUCCESSFULLY_LOGOUT);
  }
}
