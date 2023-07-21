import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilterQuery } from 'mongoose';
import { escapeRegExp } from 'lodash';

import { NoteDto, FilterPaginationDto } from 'dto';
import {
  DEFAULT_LIMIT_VALUE,
  ENV_VARIABLE_NAMES,
  RESPONSE_ERROR_MESSAGES,
  DEFAULT_PAGE_VALUE,
} from 'common';
import { DataService, IRemovedNote } from 'types';
import { Note } from 'notes/entities';
import {
  checkIsEven,
  concatStrings,
  getCurrentDate,
  getHelloByName,
} from 'utils';

@Injectable()
export class NotesService {
  readonly TEST_PREFIX = this.configService.get<string>(
    ENV_VARIABLE_NAMES.TEST,
  );
  readonly DEV_PREFIX = this.configService.get<string>(ENV_VARIABLE_NAMES.DEV);

  constructor(
    private readonly dataService: DataService,
    private readonly configService: ConfigService,
  ) {}

  getHelloWithName(name: string): string {
    if (name) {
      return getHelloByName(name);
    } else {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_NAME_ERROR);
    }
  }

  async getNotes({
    page = DEFAULT_PAGE_VALUE,
    limit = DEFAULT_LIMIT_VALUE,
    name,
    date,
    email,
  }: FilterPaginationDto): Promise<Note[]> {
    const titleExpression = new RegExp(escapeRegExp(name), 'i');
    const filterQuery: FilterQuery<Note> = {
      ...(name && { title: titleExpression }),
      ...(date && { createdAt: date }),
      isDeleted: false,
      author: email,
    };

    const notes = await this.dataService.notes.findByFilterUsingPagination(
      filterQuery,
      page,
      limit,
    );

    return notes;
  }

  async createNote(note: NoteDto, author: string): Promise<Note> {
    const notesCount = await this.dataService.notes.countItems();

    const isEven = checkIsEven(notesCount);
    const { title } = note;

    note.title = isEven
      ? concatStrings(this.TEST_PREFIX, title)
      : concatStrings(this.DEV_PREFIX, title);

    const creationDate = getCurrentDate();

    return await this.dataService.notes.create({
      ...note,
      createdAt: creationDate,
      isDeleted: false,
      author,
    });
  }

  async updateNote(
    updatedNote: NoteDto,
    id: string,
  ): Promise<Note | NotFoundException> {
    if (id !== updatedNote.id)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.ID_NOT_EQUALS);

    const note = await this.dataService.notes.findById(id);

    if (!note) throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_ID);

    if (note?.isDeleted)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.SUCH_NOTE_DELETED);

    const updatedDate = getCurrentDate();

    const updated = await this.dataService.notes.updateById(id, {
      ...updatedNote,
      updatedAt: updatedDate,
    });

    return (
      updated || new NotFoundException(RESPONSE_ERROR_MESSAGES.NO_SUCH_NOTE)
    );
  }

  async deleteNote(id: string): Promise<IRemovedNote> {
    const note = await this.dataService.notes.findById(id);

    if (note.isDeleted)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.SUCH_NOTE_DELETED);

    note.isDeleted = true;
    note.deletedAt = new Date();

    const softDeletedResult = await this.dataService.notes.deleteOneById(
      id,
      note,
    );

    return {
      id: id,
      success: !!softDeletedResult.isDeleted,
    };
  }
}
