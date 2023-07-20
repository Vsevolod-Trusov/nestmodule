import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'users/entities';
import { Note, NoteDocument } from 'notes/entities';

import { NoteRepository, UserRepository } from 'repository';
import { DataService } from 'types';

@Injectable()
export class MongoDataService implements DataService, OnApplicationBootstrap {
  notes: NoteRepository;
  users: UserRepository;

  constructor(
    @InjectModel(Note.name)
    private note: Model<NoteDocument>,
    @InjectModel(User.name)
    private user: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.notes = new NoteRepository(this.note);
    this.users = new UserRepository(this.user);
  }
}
