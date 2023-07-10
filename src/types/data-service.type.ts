import { Note, User } from 'entity';

import { GenericRepository } from './mongo-generic-repository.type';

export abstract class DataService {
  abstract notes: GenericRepository<Note>;
  abstract users: GenericRepository<User>;
}
