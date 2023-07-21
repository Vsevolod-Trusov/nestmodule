import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Note } from 'notes/entities';
import { MongoGenericRepository } from 'repository';

@Injectable()
export class NoteRepository extends MongoGenericRepository<Note> {
  constructor(notesRepository: Model<Note>) {
    super(notesRepository);
  }

  async updateById(id: string, noteToUpdate: Note) {
    return await this.update({ id: id }, noteToUpdate);
  }

  async findById(id: string) {
    return await this.findOneByFilter({ id: id });
  }

  async deleteOneById(id: string, note: Note) {
    return await this.update({ id: id }, note);
  }
}
