import { HttpStatus } from '@nestjs/common';
import { ICreateNote } from 'types';

export const URL_PREFIX = 'api';

export enum BASE_URLS {
  GREETINGS = '/greetings/:name?',
  NOTES = '/notes',
  NOTES_BY_ID = '/notes/:id?',
}

export const WRONG_NAME_ERROR = {
  code: HttpStatus.BAD_REQUEST,
  message: 'Wrong input name',
};

export const WRONG_POST_NOTE = {
  code: HttpStatus.BAD_REQUEST,
  message: 'Wrong note body',
};

export const PARAM_NAME = 'name';

export const MOCKED_NOTES = [];

export const MOCKED_NOTE: ICreateNote = {
  id: '',
  title: '',
  content: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
