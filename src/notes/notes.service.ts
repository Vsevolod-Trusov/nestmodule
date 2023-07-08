import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateNoteDto, CreateNoteDto } from 'dto';
import { RESPONSE_ERROR_MESSAGES, SUCCESS_DELETED } from 'common';
import { IDataServices } from 'types';
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

  createNote(note: CreateNoteDto): Promise<Note> {
    return this.dataService.notes.create(note);
  }

  updateNote(updatedNote: UpdateNoteDto, id: string): UpdateNoteDto {
    if (id) {
      updatedNote._id = id;

      return updatedNote;
    } else {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_ID);
    }
  }

  removeNote(id: string): object {
    SUCCESS_DELETED._id = id;
    SUCCESS_DELETED.success = !!id;

    return SUCCESS_DELETED;
  }
}
