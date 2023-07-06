import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { UpdateNoteDto, CreateNoteDto } from 'dto';

import { RESPONSE_ERROR_MESSAGES, SUCCESS_DELETED } from './constants';

@Injectable()
export class NotesService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloWithName(response: Response, name: string): Response {
    if (name) {
      return response
        .setHeader('Content-Type', 'text/html')
        .status(HttpStatus.OK)
        .send(`<h4>Hello ${name}</h4>`);
    } else {
      throw new HttpException(
        RESPONSE_ERROR_MESSAGES.WRONG_NAME_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  createNote(response: Response, note: CreateNoteDto): Response {
    const { title, content, createdAt } = note;

    if (title && content && createdAt) {
      return response.status(HttpStatus.OK).send(note);
    } else {
      throw new HttpException(
        RESPONSE_ERROR_MESSAGES.WRONG_POST_NOTE,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateNote(
    response: Response,
    updatedNote: UpdateNoteDto,
    id: string,
  ): Response {
    if (id) {
      updatedNote.id = id;

      return response.status(HttpStatus.OK).send(updatedNote);
    } else {
      throw new HttpException(
        RESPONSE_ERROR_MESSAGES.WRONG_ID,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  deleteNote(response: Response, id: string): Response {
    SUCCESS_DELETED.id = id;
    SUCCESS_DELETED.success = !!id;

    return id
      ? response.status(HttpStatus.OK).send(SUCCESS_DELETED)
      : response.status(HttpStatus.BAD_REQUEST).send(SUCCESS_DELETED);
  }
}
