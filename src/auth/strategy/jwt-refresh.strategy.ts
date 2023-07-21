import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response } from 'express';

import {
  COOKIES_HEADERS,
  ENV_VARIABLE_NAMES,
  EXPIRED_ACCESS_COOKIE_MAX_AGE,
  EXPIRED_REFRESH_COOKIE_MAX_AGE,
  STRATEGIES_NAMES,
} from 'common';
import { JwtPayload } from 'types';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES_NAMES.REFRESH,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshJwtStrategy.extractRefreshToken,
      ]),
      secretOrKey: configService.get<string>(
        ENV_VARIABLE_NAMES.REFRESH_JWT_SECRET,
      ),
      passReqToCallback: true,
    });
  }

  static extractRefreshToken(request: Request) {
    const cookies = request?.cookies;
    const refreshToken = cookies?.refreshToken;
    return refreshToken;
  }

  async validate(request: Request, payload: JwtPayload) {
    const { sub, email, role } = payload;
    const { res: response } = request;

    const tokens = await this.authService.getTokens(sub, email, role);

    response.cookie(COOKIES_HEADERS.REFRESH, tokens.refreshToken, {
      maxAge: EXPIRED_REFRESH_COOKIE_MAX_AGE,
      httpOnly: true,
    });

    response.cookie(COOKIES_HEADERS.ACCESS, tokens.accessToken, {
      maxAge: EXPIRED_ACCESS_COOKIE_MAX_AGE,
      httpOnly: true,
    });

    return { sub, email, role };
  }
}
