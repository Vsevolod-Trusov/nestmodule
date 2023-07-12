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
  UseGuards,
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
import { BASE_NOTES_URLS, CONTENT_TYPE, CONTENT_TYPE_HTML, URL_PREFIX } from 'common';
import { JwtAuthGuard } from 'auth/guard/jwt.guard';

@Controller(URL_PREFIX)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(BASE_NOTES_URLS.GREETINGS)
  getName(@Param() { name }: NameDto, @Res() response: Response): Response {
    const responseMessage = this.notesService.getHelloWithName(name);

    return response
      .setHeader(CONTENT_TYPE, CONTENT_TYPE_HTML)
      .status(HttpStatus.OK)
      .send(responseMessage);
  }

  @UseGuards(JwtAuthGuard)
  @Get(BASE_NOTES_URLS.NOTES)
  async getNotes(
    @Query() parameters: FilterPaginationDto,
    @Res() response: Response,
  ): Promise<Response> {
    const notes = await this.notesService.getNotes(parameters);

    return response.send(notes);
  }

  @UseGuards(JwtAuthGuard)
  @Post(BASE_NOTES_URLS.NOTES)
  async insertNote(
    @Body() note: CreateNoteDto,
    @Res() response: Response,
  ): Promise<Response> {
    const createdNote = await this.notesService.createNote(note);

    return response.status(HttpStatus.OK).send(createdNote);
  }

  @UseGuards(JwtAuthGuard)
  @Put(BASE_NOTES_URLS.NOTES_BY_ID)
  async updateNote(
    @Param() { id }: IdDto,
    @Body() note: UpdateNoteDto,
    @Res()
    response: Response,
  ): Promise<Response> {
    const updatedNote = await this.notesService.updateNote(note, id);

    return response.status(HttpStatus.OK).send(updatedNote);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(BASE_NOTES_URLS.NOTES_BY_ID)
  async removeNote(
    @Param() { id }: IdDto,
    @Res()
    response: Response,
  ): Promise<Response> {
    const deletedNoteResponse = await this.notesService.removeNote(id);

    return response.status(HttpStatus.OK).send(deletedNoteResponse);
  }
}
