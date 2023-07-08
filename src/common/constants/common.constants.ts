import { v4 as uuidv4 } from 'uuid';

import { CreateNoteDto } from 'dto';

export const EMPTY_LINE = '';

export const MOCKED_NOTES = [];

export const MOCKED_NOTE: CreateNoteDto = {
  id: uuidv4(),
  title: EMPTY_LINE,
  content: EMPTY_LINE,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const SUCCESS_DELETED = {
  _id: EMPTY_LINE,
  success: true,
};
