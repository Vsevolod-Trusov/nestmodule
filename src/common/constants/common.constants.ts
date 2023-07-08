import { CreateNoteDto } from "dto";

export const EMPTY_LINE = '';

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