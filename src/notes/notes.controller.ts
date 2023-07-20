import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { NameDto, NoteDto, IdDto, FilterPaginationDto } from 'dto';
import {
  BASE_NOTES_URLS,
  CONTENT_TYPE,
  CONTENT_TYPE_HTML,
  ROLES,
  URL_PREFIX,
} from 'common';
import { JwtAuthGuard, RoleGuard } from 'auth/guard';
import { Roles } from 'auth/role.decorator';

@Controller(URL_PREFIX)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(BASE_NOTES_URLS.GREETINGS)
  getName(@Param() { name }: NameDto, @Res() response: Response): Response {
    const responseMessage = this.notesService.getHelloWithName(name);

    return response
      .setHeader(CONTENT_TYPE, CONTENT_TYPE_HTML)
      .send(responseMessage);
  }

  @Roles(ROLES.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(BASE_NOTES_URLS.NOTES)
  async getNotes(@Query() parameters: FilterPaginationDto) {
    const notes = await this.notesService.getNotes(parameters);

    return notes;
  }

  @Roles(ROLES.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(BASE_NOTES_URLS.NOTES)
  async createNote(@Body() note: NoteDto) {
    const createdNote = await this.notesService.createNote(note);

    return createdNote;
  }

  @Roles(ROLES.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(BASE_NOTES_URLS.NOTES_BY_ID)
  async updateNote(@Param() { id }: IdDto, @Body() note: NoteDto) {
    const updatedNote = await this.notesService.updateNote(note, id);

    return updatedNote;
  }

  @Roles(ROLES.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(BASE_NOTES_URLS.NOTES_BY_ID)
  async deleteNote(@Param() { id }: IdDto) {
    const deletedNoteResponse = await this.notesService.deleteNote(id);

    return deletedNoteResponse;
  }
}
