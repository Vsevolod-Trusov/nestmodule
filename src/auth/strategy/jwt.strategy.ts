import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ENV_VARIABLE_NAMES } from 'common';
import { JwtPayload } from 'types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        ENV_VARIABLE_NAMES.ACCESS_JWT_SECRET,
      ),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
