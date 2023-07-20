import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import {
  AUTHORIZATION_HEADER,
  BEARER,
  EMPTY_LINE,
  ENV_VARIABLE_NAMES,
} from 'common';
import { JwtPayload } from 'types';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        ENV_VARIABLE_NAMES.REFRESH_JWT_SECRET,
      ),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    const refreshToken = request
      .get(AUTHORIZATION_HEADER)
      .replace(BEARER, EMPTY_LINE)
      .trim();

    return { ...payload, refreshToken };
  }
}
