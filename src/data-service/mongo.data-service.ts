import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Note, NoteDocument, User, UserDocument } from 'entity';
import { MongoGenericRepository, UserRepository } from 'repository';
import { DataService } from 'types';

@Injectable()
export class MongoDataService implements DataService, OnApplicationBootstrap {
  notes: MongoGenericRepository<NoteDocument>;
  users: UserRepository;

  constructor(
    @InjectModel(Note.name)
    private note: Model<NoteDocument>,
    @InjectModel(User.name)
    private user: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.notes = new MongoGenericRepository<NoteDocument>(this.note);
    this.users = new UserRepository(this.user);
  }
}
