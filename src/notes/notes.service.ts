import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateNoteDto, CreateNoteDto } from 'dto';
import { RESPONSE_ERROR_MESSAGES, SUCCESS_DELETED } from 'common';

@Injectable()
export class NotesService {
  getHelloWithName(name: string): string {
    if (name) {
      return `<h4>Hello ${name}</h4>`;
    } else {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_NAME_ERROR);
    }
  }

  createNote(note: CreateNoteDto): CreateNoteDto {
    return note;
  }

  updateNote(updatedNote: UpdateNoteDto, id: string): UpdateNoteDto {
    if (id) {
      updatedNote.id = id;

      return updatedNote;
    } else {
      throw new BadRequestException(RESPONSE_ERROR_MESSAGES.WRONG_ID);
    }
  }

  removeNote(id: string): object {
    SUCCESS_DELETED.id = id;
    SUCCESS_DELETED.success = !!id;

    return SUCCESS_DELETED;
  }
}
