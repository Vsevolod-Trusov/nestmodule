import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UpdateNoteDto, CreateNoteDto, FilterPaginationDto } from 'dto';
import { DEFAULT_LIMIT_VALUE, ENV, RESPONSE_ERROR_MESSAGES, DEFAULT_PAGE_VALUE } from 'common';
import { DataService, IRemovedNote } from 'types';
import { Note } from 'entity';
import { checkIsEven, concatStrings } from 'utils';
import { FilterQuery } from 'mongoose';

@Injectable()
export class NotesService {
  readonly TEST_PREFIX = this.configService.get<string>(ENV.TEST);
  readonly DEV_PREFIX = this.configService.get<string>(ENV.DEV);

  constructor(
    private readonly dataService: DataService,
    private configService: ConfigService,
  ) {}

  getHelloWithName(name: string): string {
    if (name) {
      return `<h4>Hello ${name}</h4>`;
    } else {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_NAME_ERROR);
    }
  }

  async getNotes({
    page = DEFAULT_PAGE_VALUE,
    limit = DEFAULT_LIMIT_VALUE,
    name,
    date,
  }: FilterPaginationDto): Promise<Note[]> {
    const filterQuery: FilterQuery<Note> = {
      ...(name && { title: name }),
      ...(date && { createdAt: date }),
    };

    const notes = await this.dataService.notes.findByFilterUsingPagination(
      filterQuery,
      page,
      limit,
    );

    return notes;
  }

  async createNote(note: CreateNoteDto): Promise<Note> {
    const notesCount = await this.dataService.notes.countItems();

    const isEven = checkIsEven(notesCount);
    const { title } = note;

    note.title = isEven
      ? concatStrings(this.TEST_PREFIX, title)
      : concatStrings(this.DEV_PREFIX, title);

    return await this.dataService.notes.create(note);
  }

  async updateNote(updatedNote: UpdateNoteDto, id: string): Promise<Note> {
    if (id !== updatedNote.id)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.ID_NOT_EQUALS);

    return await this.dataService.notes.update({ id: id }, updatedNote);
  }

  async removeNote(id: string): Promise<IRemovedNote> {
    const deletedResult = await this.dataService.notes.deleteOne({ id: id });

    return {
      id: id,
      success: !!deletedResult.deletedCount,
    };
  }
}
