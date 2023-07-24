import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response } from 'express';

import {
  ACCESS_TOKEN_HEADER,
  ENV_VARIABLE_NAMES,
  REFRESH_TOKEN_HEADER,
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
    return request?.header(REFRESH_TOKEN_HEADER);
  }

  async validate(request: Request, payload: JwtPayload) {
    const { sub, email, role } = payload;
    const { res: response } = request;

    const tokens = await this.authService.refreshTokens(sub);

    response.set(REFRESH_TOKEN_HEADER, tokens.refreshToken);
    response.set(ACCESS_TOKEN_HEADER, tokens.accessToken);

    return { sub, email, role };
  }
}
