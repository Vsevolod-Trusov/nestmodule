import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Note, NoteDocument } from 'entity';
import { MongoGenericRepository } from 'repository';
import { IDataServices } from 'types';

@Injectable()
export class MongoDataService implements IDataServices, OnApplicationBootstrap {
  notes: MongoGenericRepository<NoteDocument>;

  constructor(
    @InjectModel(Note.name)
    private noteRepository: Model<NoteDocument>,
  ) {}

  onApplicationBootstrap() {
    this.notes = new MongoGenericRepository<NoteDocument>(this.noteRepository);
  }
}