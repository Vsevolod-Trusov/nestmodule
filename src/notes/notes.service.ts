import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateNoteDto, CreateNoteDto, FilterPaginationDto } from 'dto';
import { RESPONSE_ERROR_MESSAGES } from 'common';
import { DataService, IRemovedNote } from 'types';
import { Note } from 'entity';

@Injectable()
export class NotesService {
  constructor(private readonly dataService: DataService) {}

  getHelloWithName(name: string): string {
    if (name) {
      return `<h4>Hello ${name}</h4>`;
    } else {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_NAME_ERROR);
    }
  }

  async getNotes({
    page,
    limit,
    name,
    date,
  }: FilterPaginationDto): Promise<Note[]> {
    if (page && limit) {
      if (name) {
        return await this.dataService.notes.findByFilterUsingPagination(
          { title: name },
          page,
          limit,
        );
      }

      if (date) {
        return await this.dataService.notes.findByFilterUsingPagination(
          { createdAt: date },
          page,
          limit,
        );
      }

      return await this.dataService.notes.findAllUsingPagination(page, limit);
    }

    if (name) {

      return await this.dataService.notes.findByFilter({ title: name });
    }

    if (date) {
      
      return await this.dataService.notes.findByFilter({ createdAt: name });
    }

    return await this.dataService.notes.findAll();
  }

  async createNote(note: CreateNoteDto): Promise<Note> {
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
