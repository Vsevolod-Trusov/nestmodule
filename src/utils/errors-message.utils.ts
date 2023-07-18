import {
  ConflictException,
  HttpException,
  NotAcceptableException,
} from '@nestjs/common';

export const getErrorMessage = (exception: unknown) => {
  switch (exception) {
    case HttpException:
      return (exception as HttpException).getResponse();
    case NotAcceptableException: {
      return (exception as NotAcceptableException).message;
    }
    case ConflictException: {
      return (exception as ConflictException).message;
    }
    default: {
      return exception;
    }
  }
};
