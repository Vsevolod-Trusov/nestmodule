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
    const responseMessage = this.notesService.getHelloWithName(name);

    return response
      .setHeader('Content-Type', 'text/html')
      .status(HttpStatus.OK)
      .send(responseMessage);
  }

  @Get(BASE_URLS.NOTES)
  getNotes(@Res() response: Response): Response {
    return response.status(HttpStatus.OK).send(MOCKED_NOTES);
  }

  @Post(BASE_URLS.NOTES)
  insertNote(@Body() note: CreateNoteDto, @Res() response: Response): Response {
    const createdNote = this.notesService.createNote(note);

    return response.status(HttpStatus.OK).send(createdNote);
  }

  @Put(BASE_URLS.NOTES_BY_ID)
  updateNote(
    @Param(NOTES_PARAMETERS.ID) id: string,
    @Body() note: UpdateNoteDto,
    @Res()
    response: Response,
  ): Response {
    const updatedNote = this.notesService.updateNote(note, id);

    return response.status(HttpStatus.OK).send(updatedNote);
  }

  @Delete(BASE_URLS.NOTES_BY_ID)
  removeNote(
    @Param(NOTES_PARAMETERS.ID) id: string,
    @Res()
    response: Response,
  ): Response {
    const deletedNoteResponse = this.notesService.removeNote(id);

    return response.status(HttpStatus.OK).send(deletedNoteResponse);
  }
}
