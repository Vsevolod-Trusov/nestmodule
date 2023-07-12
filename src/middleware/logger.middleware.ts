import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { CLOSE_EVENT_NAME, HTTP_NAME } from 'common';
import { Request, Response } from 'express';

import { getLogInfo } from 'utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(HTTP_NAME);

  use(request: Request, response: Response, next: () => void) {
    const { method, originalUrl } = request;

    response.on(CLOSE_EVENT_NAME, () => {
      const { statusCode } = response;

      this.logger.log(getLogInfo(method, originalUrl, statusCode));
    });

    next();
  }
}
