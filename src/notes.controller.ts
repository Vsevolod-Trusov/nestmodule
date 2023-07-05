import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { NotesService } from 'notes.service';

import {
  BASE_URLS,
  URL_PREFIX,
  WRONG_NAME_ERROR,
  PARAM_NAME,
} from './constants';

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
}
