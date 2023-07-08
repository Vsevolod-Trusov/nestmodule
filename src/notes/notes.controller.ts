import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { NotesService } from 'notes/notes.service';
import { UpdateNoteDto, CreateNoteDto } from 'dto';
import { BASE_URLS, URL_PREFIX, NOTES_PARAMETERS, MOCKED_NOTES } from 'common';

@Controller(URL_PREFIX)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(BASE_URLS.GREETINGS)
  getName(
    @Param(NOTES_PARAMETERS.NAME) name: string,
    @Res() response: Response,
  ): Response {
    return this.notesService.getHelloWithName(response, name);
  }

  @Get(BASE_URLS.NOTES)
  getNotes(@Res() response: Response): Response {
    return response.status(HttpStatus.OK).send(MOCKED_NOTES);
  }

  @Post(BASE_URLS.NOTES)
  insertNote(@Body() note: CreateNoteDto, @Res() response: Response): Response {
    return this.notesService.createNote(response, note);
  }

  @Put(BASE_URLS.NOTES_BY_ID)
  updateNote(
    @Param(NOTES_PARAMETERS.ID) id: string,
    @Body() updatedNote: UpdateNoteDto,
    @Res()
    response: Response,
  ): Response {
    return this.notesService.updateNote(response, updatedNote, id);
  }

  @Delete(BASE_URLS.NOTES_BY_ID)
  removeNote(
    @Param(NOTES_PARAMETERS.ID) id: string,
    @Res()
    response: Response,
  ): Response {
    return this.notesService.deleteNote(response, id);
  }
}
