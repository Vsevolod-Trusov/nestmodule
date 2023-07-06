import { CreateNoteDto } from 'dto';

export const URL_PREFIX = 'api';

export const EMPTY_LINE = '';

export enum BASE_URLS {
  GREETINGS = '/greetings/:name?',
  NOTES = '/notes',
  NOTES_BY_ID = '/notes/:id?',
}

export const enum RESPONSE_ERROR_MESSAGES {
  WRONG_POST_NOTE = 'Wrong note body',
  WRONG_NAME_ERROR = 'Wrong input name',
  WRONG_ID = 'Wrong id value',
}

export const MOCKED_NOTES = [];

export const MOCKED_NOTE: CreateNoteDto = {
  id: EMPTY_LINE,
  title: EMPTY_LINE,
  content: EMPTY_LINE,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const SUCCESS_DELETED = {
  id: EMPTY_LINE,
  success: true,
};
