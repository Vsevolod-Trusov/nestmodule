import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, Schema as MongooseSchema } from 'mongoose';

import { Note } from 'notes/entities';
import { MongoGenericRepository } from 'repository';
import { getSkipValue } from 'utils';
import { POPULATE_FIELD } from 'common';

@Injectable()
export class NoteRepository extends MongoGenericRepository<Note> {
  constructor(private readonly notesRepository: Model<Note>) {
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

  async findByFilterUsingPaginationAndPopulate(
    filter: FilterQuery<Note>,
    page: number,
    limit: number,
    _id: MongooseSchema.Types.ObjectId,
  ) {
    const skip = getSkipValue(page, limit);

    return await this.notesRepository
      .find({ ...filter, author: _id })
      .populate({
        path: POPULATE_FIELD,
        match: { _id: { $eq: _id } },
      })
      .limit(limit)
      .skip(skip)
      .exec();
  }
}
