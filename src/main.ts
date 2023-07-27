import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AllExceptionsFilter } from 'middleware/errors.middleware';
import {
  PORT,
  ORIGINS,
  REFRESH_TOKEN_HEADER,
  ACCESS_TOKEN_HEADER,
  CONTENT_TYPE,
} from 'common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.use(cookieParser());
  app.enableCors({
    origin: ORIGINS, //'http://localhost:3000', //
    allowedHeaders: [REFRESH_TOKEN_HEADER, ACCESS_TOKEN_HEADER, CONTENT_TYPE],
    credentials: true,
  });
  await app.listen(process.env.PORT || PORT);
}
bootstrap();
