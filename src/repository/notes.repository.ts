import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Note } from 'entity';
import { MongoGenericRepository } from 'repository';

@Injectable()
export class NoteRepository extends MongoGenericRepository<Note> {
  constructor(notesRepository: Model<Note>) {
    super(notesRepository);
  }

  async updateById(id: string, noteToUpdate: Note) {
    return await this.update({ id: id }, noteToUpdate);
  }

  async deleteOneById(id: string) {
    return await this.deleteOne({ id: id });
  }
}
