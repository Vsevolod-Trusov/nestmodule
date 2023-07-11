import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import {
  ENV,
  NULL_VALUE,
  RESPONSE_ERROR_MESSAGES,
  ROUNDS_AMOUNT,
} from 'common';
import { AuthDto, CreateUserDto } from 'dto';
import { DataService } from 'types';
import { compareHashes, hashData } from 'utils';

@Injectable()
export class AuthService {
  readonly ACCESS_TOKEN_SECRET = this.configService.get<string>(
    ENV.ACCESS_JWT_SECRET,
  );
  readonly REFRESH_TOKEN_SECRET = this.configService.get<string>(
    ENV.REFRESH_JWT_SECRET,
  );
  readonly ACCESS_EXPIRED_PERIOD = this.configService.get<string>(
    ENV.ACCESS_JWT_PERIOD,
  );
  readonly REFRESH_EXPIRED_PERIOD = this.configService.get<string>(
    ENV.REFRESH_JWT_PERIOD,
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
    const userExists = await this.dataService.users.findOneByEmail(email);

    if (userExists) {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.SUCH_USER_EXISTS);
    }

    const hash: string = await hashData(password, ROUNDS_AMOUNT);
    const createdUser = await this.dataService.users.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(userId, email);

    createdUser.refreshToken = tokens.refreshToken;
    await this.updateRefreshToken(userId, createdUser);

    return tokens;
  }

  async signIn(data: AuthDto) {
    const { email, password } = data;

    const user = await this.dataService.users.findOneByEmail(email);

    if (!user)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.USER_NOT_EXIST);

    const passwordMatches = await compareHashes(password, user.password);

    if (!passwordMatches)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_PASSWORD);

    const tokens = await this.getTokens(user.id, user.email);
    user.refreshToken = tokens.refreshToken;

    await this.updateRefreshToken(user.id, user);
    return tokens;
  }

  async logOut(email: string) {
    const user = await this.dataService.users.findOneByEmail(email);

    if (!user)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.USER_NOT_EXIST);

    user.refreshToken = NULL_VALUE;
    return await this.dataService.users.update({ email: email }, user);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.dataService.users.findOneByFilter({ id: userId });

    if (!user)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.USER_NOT_EXIST);

    const { id, refreshToken: userRefreshToken, email } = user;

    if (!id || !userRefreshToken)
      throw new ForbiddenException(RESPONSE_ERROR_MESSAGES.REQUEST_DENIED);

    const refreshTokenMatches = await compareHashes(
      refreshToken,
      userRefreshToken,
    );

    if (!refreshTokenMatches)
      throw new ForbiddenException(RESPONSE_ERROR_MESSAGES.REQUEST_DENIED);

    const tokens = await this.getTokens(id, email);
    user.refreshToken = tokens.refreshToken;

    await this.updateRefreshToken(id, user);

    return tokens;
  }

  async updateRefreshToken(userId: string, userDto: CreateUserDto) {
    const { refreshToken } = userDto;
    const hashedRefreshToken = await hashData(refreshToken, ROUNDS_AMOUNT);
    userDto.refreshToken = hashedRefreshToken;
    await this.dataService.users.update({ id: userId }, userDto);
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
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
