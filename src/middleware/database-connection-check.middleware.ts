import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { DATABASE_READY_STATE, RESPONSE_ERROR_MESSAGES } from 'common';

@Injectable()
export class DatabaseConnectionCheckMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  use(next: () => void) {
    const isConnectionReady =
      this.connection.readyState === DATABASE_READY_STATE;

    if (!isConnectionReady)
      throw new InternalServerErrorException(
        RESPONSE_ERROR_MESSAGES.BAD_DATABASE_CONNECTION,
      );

    next();
  }
}
