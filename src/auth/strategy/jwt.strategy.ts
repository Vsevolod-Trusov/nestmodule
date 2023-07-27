import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import {
  ACCESS_TOKEN_HEADER,
  ENV_VARIABLE_NAMES,
  STRATEGIES_NAMES,
} from 'common';
import { JwtPayload } from 'types';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES_NAMES.ACCESS,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractAccessToken,
      ]),
      secretOrKey: configService.get<string>(
        ENV_VARIABLE_NAMES.ACCESS_JWT_SECRET,
      ),
    });
  }

  static extractAccessToken(request: Request) {
    //request?.header(ACCESS_TOKEN_HEADER);
    const cookies = request?.cookies;
    const accessToken = cookies.accessToken;
    return accessToken;
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
