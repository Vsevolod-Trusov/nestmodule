import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateNoteDto, CreateNoteDto } from 'dto';
import { RESPONSE_ERROR_MESSAGES } from 'common';
import { IDataServices, IRemovedNote } from 'types';
import { Note } from 'entity';

@Injectable()
export class NotesService {
  constructor(private readonly dataService: IDataServices) {}

  getHelloWithName(name: string): string {
    if (name) {
      return `<h4>Hello ${name}</h4>`;
    } else {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_NAME_ERROR);
    }
  }

  async getNotes(): Promise<Note[]> {
    return await this.dataService.notes.findAll();
  }

  async createNote(note: CreateNoteDto): Promise<Note> {
    return await this.dataService.notes.create(note);
  }

  async updateNote(updatedNote: UpdateNoteDto, id: string): Promise<Note> {
    if (id) {

      if (id !== updatedNote.id) 
        throw new BadRequestException(RESPONSE_ERROR_MESSAGES.ID_NOT_EQUALS)

      return await this.dataService.notes.update({id: id}, updatedNote);
    } 

    throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_ID);
  }

  async removeNote(id: string): Promise<IRemovedNote> {
    const deletedResult = await this.dataService.notes.deleteOne({id: id});

    return  {
      id: id,
      success: !!deletedResult.deletedCount
    };
  }
}
