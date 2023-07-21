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
import {
  NameDto,
  NoteDto,
  IdDto,
  FilterPaginationDto,
  CreateUserDto,
} from 'dto';
import {
  BASE_NOTES_URLS,
  CONTENT_TYPE,
  CONTENT_TYPE_HTML,
  ROLES,
  STRATEGIES_NAMES,
  URL_PREFIX,
} from 'common';
import { RoleGuard } from 'auth/guard';
import { Roles } from 'auth/role.decorator';
import { GetUserPayload } from 'decorators';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(
    AuthGuard([STRATEGIES_NAMES.ACCESS, STRATEGIES_NAMES.REFRESH]),
    RoleGuard,
  )
  @Get(BASE_NOTES_URLS.NOTES)
  async getNotes(
    @Query() parameters: FilterPaginationDto,
    @GetUserPayload() { email },
  ) {
    const notes = await this.notesService.getNotes({ ...parameters, email });

    return notes;
  }

  @Roles(ROLES.USER)
  @UseGuards(
    AuthGuard([STRATEGIES_NAMES.ACCESS, STRATEGIES_NAMES.REFRESH]),
    RoleGuard,
  )
  @HttpCode(HttpStatus.CREATED)
  @Post(BASE_NOTES_URLS.NOTES)
  async createNote(
    @Body() note: NoteDto,
    @GetUserPayload() { email }: CreateUserDto,
  ) {
    const createdNote = await this.notesService.createNote(note, email);

    return createdNote;
  }

  @Roles(ROLES.USER)
  @UseGuards(
    AuthGuard([STRATEGIES_NAMES.ACCESS, STRATEGIES_NAMES.REFRESH]),
    RoleGuard,
  )
  @Put(BASE_NOTES_URLS.NOTES_BY_ID)
  async updateNote(@Param() { id }: IdDto, @Body() note: NoteDto) {
    const updatedNote = await this.notesService.updateNote(note, id);

    return updatedNote;
  }

  @Roles(ROLES.USER)
  @UseGuards(
    AuthGuard([STRATEGIES_NAMES.ACCESS, STRATEGIES_NAMES.REFRESH]),
    RoleGuard,
  )
  @Delete(BASE_NOTES_URLS.NOTES_BY_ID)
  async deleteNote(@Param() { id }: IdDto) {
    const deletedNoteResponse = await this.notesService.deleteNote(id);

    return deletedNoteResponse;
  }
}
