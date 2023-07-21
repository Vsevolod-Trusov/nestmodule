import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import {
  ENV_VARIABLE_NAMES,
  RESPONSE_ERROR_MESSAGES,
  ROUNDS_AMOUNT,
} from 'common';
import { AuthDto, CreateUserDto } from 'dto';
import { DataService } from 'types';
import { compareHashes, hashData } from 'utils';

@Injectable()
export class AuthService {
  readonly ACCESS_TOKEN_SECRET = this.configService.get<string>(
    ENV_VARIABLE_NAMES.ACCESS_JWT_SECRET,
  );
  readonly REFRESH_TOKEN_SECRET = this.configService.get<string>(
    ENV_VARIABLE_NAMES.REFRESH_JWT_SECRET,
  );
  readonly ACCESS_EXPIRED_PERIOD = this.configService.get<string>(
    ENV_VARIABLE_NAMES.ACCESS_JWT_PERIOD,
  );
  readonly REFRESH_EXPIRED_PERIOD = this.configService.get<string>(
    ENV_VARIABLE_NAMES.REFRESH_JWT_PERIOD,
  );

  constructor(
    private dataService: DataService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { id, email, password } = createUserDto;
    const userId = id || uuidv4();
    createUserDto.id = userId;
    const user = await this.dataService.users.findOneByEmail(email);

    if (user) {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.SUCH_USER_EXISTS);
    }

    const hash: string = await hashData(password, ROUNDS_AMOUNT);
    const createdUser = await this.dataService.users.create({
      ...createUserDto,
      password: hash,
    });

    return createdUser;
  }

  async signIn(data: AuthDto) {
    const { email, password } = data;

    const user = await this.dataService.users.findOneByEmail(email);

    if (!user)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.USER_NOT_EXIST);

    const passwordMatches = await compareHashes(password, user.password);

    if (!passwordMatches)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_PASSWORD);

    const tokens = await this.getTokens(user.id, user.email, user.role);

    return tokens;
  }

  async refreshTokens(userId: string) {
    const user = await this.dataService.users.findOneById(userId);

    if (!user)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.USER_NOT_EXIST);

    const { id, email, role } = user;

    const tokens = await this.getTokens(id, email, role);

    return tokens;
  }

  async getTokens(userId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.ACCESS_TOKEN_SECRET,
          expiresIn: this.ACCESS_EXPIRED_PERIOD,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.REFRESH_TOKEN_SECRET,
          expiresIn: this.REFRESH_EXPIRED_PERIOD,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
