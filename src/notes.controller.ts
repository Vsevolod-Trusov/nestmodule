import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { NotesService } from 'notes.service';

import {
  BASE_URLS,
  URL_PREFIX,
  WRONG_NAME_ERROR,
  PARAM_NAME,
  MOCKED_NOTES,
  WRONG_POST_NOTE,
} from './constants';
import { ICreateNote } from 'types';

@Controller(URL_PREFIX)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(BASE_URLS.GREETINGS)
  getName(
    @Param(PARAM_NAME) name: string,
    @Res({ passthrough: true }) res: Response,
  ): Response {
    return name
      ? res
          .setHeader('Content-Type', 'text/html')
          .status(HttpStatus.OK)
          .send(this.notesService.getHelloWithName(name))
      : res.status(HttpStatus.BAD_REQUEST).json(WRONG_NAME_ERROR);
  }

  @Get(BASE_URLS.NOTES)
  getNotes(@Res({ passthrough: true }) response: Response): Response {
    return response.status(HttpStatus.OK).send(MOCKED_NOTES);
  }

  @Post(BASE_URLS.NOTES)
  insertNote(
    @Body() note: ICreateNote,
    @Res({ passthrough: true }) response: Response,
  ): Response {
    const { id, title, content, createdAt } = note;

    return id && title && content && createdAt
      ? response.status(HttpStatus.OK).send(note)
      : response.status(HttpStatus.BAD_REQUEST).json(WRONG_POST_NOTE);
  } //TODO: остановился на таске 2 надо сделать put, delete + postman переключаюсь на front
}
