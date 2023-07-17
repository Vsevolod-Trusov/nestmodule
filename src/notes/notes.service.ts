import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UpdateNoteDto, CreateNoteDto, FilterPaginationDto } from 'dto';
import {
  DEFAULT_LIMIT_VALUE,
  ENV,
  RESPONSE_ERROR_MESSAGES,
  DEFAULT_PAGE_VALUE,
} from 'common';
import { DataService, IRemovedNote } from 'types';
import { Note } from 'entity';
import { checkIsEven, concatStrings, getCurrentDate } from 'utils';
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
    const { updatedAt, ...creatingNote } = note;
    const { title } = creatingNote;

    creatingNote.title = isEven
      ? concatStrings(this.TEST_PREFIX, title)
      : concatStrings(this.DEV_PREFIX, title);

    const creationDate = getCurrentDate();

    return await this.dataService.notes.create({
      ...creatingNote,
      createdAt: creationDate,
    });
  }

  async updateNote(
    updatedNote: UpdateNoteDto,
    id: string,
  ): Promise<Note | NotFoundException> {
    if (id !== updatedNote.id)
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.ID_NOT_EQUALS);

    const { createdAt, ...note } = updatedNote;

    const updatedDate = getCurrentDate();

    const updated = await this.dataService.notes.updateById(id, {
      ...note,
      updatedAt: updatedDate,
    });

    return (
      updated || new NotFoundException(RESPONSE_ERROR_MESSAGES.NO_SUCH_NOTE)
    );
  }

  async removeNote(id: string): Promise<IRemovedNote> {
    const deletedResult = await this.dataService.notes.deleteOneById(id);

    return {
      id: id,
      success: !!deletedResult.deletedCount,
    };
  }
}
