import { HttpStatus } from '@nestjs/common';

export const URL_PREFIX = 'api';

export enum BASE_URLS {
  GREETINGS = '/greetings/:name?',
}

export const WRONG_NAME_ERROR = {
  code: HttpStatus.BAD_REQUEST,
  message: 'Wrong input name',
};

export const PARAM_NAME = 'name';
