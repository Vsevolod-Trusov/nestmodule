import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { NotesService } from 'notes/notes.service';
import {
  NameDto,
  UpdateNoteDto,
  CreateNoteDto,
  IdDto,
  FilterPaginationDto,
} from 'dto';
import { BASE_URLS, URL_PREFIX } from 'common';

@Controller(URL_PREFIX)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(BASE_URLS.GREETINGS)
  getName(@Param() { name }: NameDto, @Res() response: Response): Response {
    const responseMessage = this.notesService.getHelloWithName(name);

    return response
      .setHeader('Content-Type', 'text/html')
      .status(HttpStatus.OK)
      .send(responseMessage);
  }

  @Get(BASE_URLS.NOTES)
  async getNotes(
    @Query() parameters: FilterPaginationDto,
    @Res() response: Response,
  ): Promise<Response> {
    const notes = await this.notesService.getNotes(parameters);

    return response.send(notes);
  }

  @Post(BASE_URLS.NOTES)
  async insertNote(
    @Body() note: CreateNoteDto,
    @Res() response: Response,
  ): Promise<Response> {
    const createdNote = await this.notesService.createNote(note);

    return response.status(HttpStatus.OK).send(createdNote);
  }

  @Put(BASE_URLS.NOTES_BY_ID)
  async updateNote(
    @Param() { id }: IdDto,
    @Body() note: UpdateNoteDto,
    @Res()
    response: Response,
  ): Promise<Response> {
    const updatedNote = await this.notesService.updateNote(note, id);

    return response.status(HttpStatus.OK).send(updatedNote);
  }

  @Delete(BASE_URLS.NOTES_BY_ID)
  async removeNote(
    @Param() { id }: IdDto,
    @Res()
    response: Response,
  ): Promise<Response> {
    const deletedNoteResponse = await this.notesService.removeNote(id);

    return response.status(HttpStatus.OK).send(deletedNoteResponse);
  }
}
